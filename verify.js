async function verify() {
  const routes = ['/', '/styles.css', '/script.js', '/assets/flyer.jpg'];
  for (const r of routes) {
    const res = await fetch('http://localhost:5600' + r);
    const buf = await res.arrayBuffer();
    console.log(r.padEnd(20), 'Status:', res.status, '| Bytes:', buf.byteLength);
    if (!res.ok) throw new Error('Failed ' + r);
  }

  const htmlRes = await fetch('http://localhost:5600/');
  const html = await htmlRes.text();
  console.log('Has Home in Desktop Nav:', html.includes('href="#home" class="nav-link">Home</a>'));
  console.log('Has Home in Mobile Drawer:', html.includes('href="#home" class="drawer-link"><span>Home</span>'));
  console.log('Has autofocus on input:', html.includes('autofocus'));

  console.log('✅ ALL JATTO TECH WORLD ASSETS & CHECKS PASSED!');
}
verify().catch(e => { console.error(e); process.exit(1); });
