// Optional real-browser regression: see the theme README for setup.
import {tmpdir} from 'node:os'
import {join} from 'node:path'
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core')
const baseURL=(process.env.SLIDEV_URL || 'http://localhost:3031').replace(/\/$/,'')
const artifacts=join(tmpdir(),'sixie-background-regression')
import assert from 'node:assert/strict'
import {mkdir,writeFile} from 'node:fs/promises'
const browser=await chromium.launch({...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})})
const page=await browser.newPage({viewport:{width:1440,height:1000}})
const errors=[];page.on('pageerror',e=>errors.push(e.message))
await mkdir(artifacts,{recursive:true})
try {
 await page.goto(`${baseURL}/1`,{waitUntil:'networkidle'})
 assert.equal(await page.locator('#slide-container > .sixie-backdrops > .sixie-backdrop').count(),4,'background layers must live outside the animated canvas')
 const ids=await page.locator('.sixie-backdrop').evaluateAll(els=>els.map((el,i)=>{el.dataset.identity=String(i);return el.dataset.background}))
 await page.evaluate(()=>{
  window.frames=[];window.recording=true
  const sample=()=>{
   const root=document.querySelector('#slide-container'), layer=root.querySelector('.sixie-backdrops'),c=document.querySelector('#slide-content')
   const b=layer?.getBoundingClientRect()
   window.frames.push({t:performance.now(),path:location.pathname,background:root.querySelector('.sixie-viewport')?.dataset.background,canvasColor:getComputedStyle(c).backgroundColor,width:b?.width,height:b?.height,
    layers:[...root.querySelectorAll('.sixie-backdrop')].map(el=>({kind:el.dataset.background,id:el.dataset.identity,opacity:parseFloat(getComputedStyle(el).opacity)}))})
   if(window.recording)requestAnimationFrame(sample)
  };requestAnimationFrame(sample)
 })
 // Reverse while paper is only partially visible, then interrupt several times.
 for(const [key,delay] of [['ArrowRight',900],['ArrowRight',110],['ArrowLeft',90],['ArrowRight',80],['ArrowLeft',90],['ArrowLeft',900],['ArrowRight',900],['ArrowRight',900],['ArrowRight',900],['ArrowLeft',900]]) {
  await page.keyboard.press(key);await page.waitForTimeout(delay)
 }
 const frames=await page.evaluate(()=>{window.recording=false;return window.frames})
 await writeFile(join(artifacts,'frames.json'),JSON.stringify(frames,null,2))
 for(let i=0;i<frames.length;i++) {
  const f=frames[i]
  assert.equal(f.width,1440);assert.equal(f.height,1000)
  assert.equal(f.canvasColor,'rgba(0, 0, 0, 0)')
  assert.deepEqual(f.layers.map(l=>l.kind),ids)
  assert.deepEqual(f.layers.map(l=>l.id),['0','1','2','3'],'layers must not remount/restart on navigation')
  assert.ok(f.layers.reduce((sum,l)=>sum+l.opacity,0)>.2,'no blank/background-free frame')
  if(i>0)for(let j=0;j<4;j++) {
   const delta=Math.abs(f.layers[j].opacity-frames[i-1].layers[j].opacity),dt=f.t-frames[i-1].t
   assert.ok(delta<=dt*.008+.05,`opacity jumped for ${f.layers[j].kind}: ${delta} in ${dt}ms`)
  }
 }
 console.log(`PASS ${frames.length} consecutive frames: no opacity resets, remounts, blank frames or opaque canvas`)
 for(const size of [{width:1440,height:1000},{width:1920,height:800},{width:720,height:1100}]) {
  await page.setViewportSize(size)
  for(const [no,kind] of [[1,'cover'],[2,'section'],[3,'paper'],[7,'dark']]) {
   await page.goto(`${baseURL}/${no}`,{waitUntil:'networkidle'})
   await page.waitForTimeout(900)
   const result=await page.locator('.sixie-backdrops').evaluate(el=>{
    const r=el.getBoundingClientRect(),active=el.querySelector('.is-active')
    return {x:r.x,y:r.y,width:r.width,height:r.height,kind:active.dataset.background,opacity:getComputedStyle(active).opacity}
   })
   assert.deepEqual(result,{x:0,y:0,width:size.width,height:size.height,kind,opacity:'1'})
   // Decode each CSS artwork URL, catching HTML fallbacks as well as 404s.
   const decoded=await page.locator('.sixie-backdrop').evaluateAll(async els=>{
    const urls=[...new Set(els.flatMap(el=>[...getComputedStyle(el).backgroundImage.matchAll(/url\("?([^"\)]+)"?\)/g)].map(m=>m[1])))]
    return Promise.all(urls.map(async src=>{const i=new Image();i.src=src;await i.decode();return i.naturalWidth>0}))
   })
   assert.ok(decoded.every(Boolean))
   if(size.width===1440)await page.screenshot({path:join(artifacts,`${kind}.png`)})
  }
  console.log(`PASS ${size.width}x${size.height}: all full-window background kinds and artwork decode`)
 }
 await page.goto(`${baseURL}/1`,{waitUntil:'networkidle'})
 await page.emulateMedia({reducedMotion:'reduce'})
 await page.keyboard.press('ArrowRight');await page.waitForTimeout(100)
 assert.equal(await page.locator('.sixie-backdrop.is-active').getAttribute('data-background'),'section')
 assert.equal(await page.locator('.sixie-backdrop[data-background="cover"]').evaluate(el=>getComputedStyle(el).opacity),'0')
 await page.emulateMedia({reducedMotion:'no-preference'})
 for(const route of ['presenter/1','overview','1?print']) {
  await page.goto(`${baseURL}/${route}`,{waitUntil:'networkidle'})
  assert.equal(await page.locator('.sixie-backdrops').count(),0)
  assert.match(await page.locator('.sixie-cover').first().evaluate(el=>getComputedStyle(el).backgroundImage),/title-frame/)
 }
 await page.goto(`${baseURL}/1`,{waitUntil:'networkidle'})
 await page.emulateMedia({media:'print'})
 assert.equal(await page.locator('.sixie-backdrops').evaluate(el=>getComputedStyle(el).display),'none')
 assert.match(await page.locator('[data-slidev-no="1"] .sixie-cover').evaluate(el=>getComputedStyle(el).backgroundImage),/title-frame/)
 assert.deepEqual(errors,[])
 console.log('PASS reduced motion, presenter, overview, print-route and print media')
}finally{await browser.close()}
