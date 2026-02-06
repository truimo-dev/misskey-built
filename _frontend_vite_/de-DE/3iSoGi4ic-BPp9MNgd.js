const c=(t,s)=>{const a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),n=parseInt(a[1],16),r=parseInt(a[2],16),e=parseInt(a[3],16);return`rgba(${n}, ${r}, ${e}, ${s})`};export{c as a};
