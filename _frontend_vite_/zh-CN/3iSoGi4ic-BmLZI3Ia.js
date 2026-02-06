import{ce as h,cf as c}from"./3iSoGi4ic-DV-GuiCp.js";function T(d){return d}class x{gl;canvas=null;renderWidth;renderHeight;baseTexture;shaderCache=new Map;perLayerResultTextures=new Map;perLayerResultFrameBuffers=new Map;nopProgram;registeredTextures=new Map;registeredFunctions=new Map;constructor(t){this.canvas=t.canvas,this.renderWidth=t.renderWidth,this.renderHeight=t.renderHeight,this.canvas.width=this.renderWidth,this.canvas.height=this.renderHeight;const e=this.canvas.getContext("webgl2",{preserveDrawingBuffer:!1,alpha:!0,premultipliedAlpha:!1});if(e==null)throw new Error("Failed to initialize WebGL2 context");this.gl=e,e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight);const i=new Float32Array([-1,-1,-1,1,1,1,-1,-1,1,1,1,-1]),r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,i,e.STATIC_DRAW),t.image!=null?(this.baseTexture=h(e),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.baseTexture),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t.image.width,t.image.height,0,e.RGBA,e.UNSIGNED_BYTE,t.image),e.bindTexture(e.TEXTURE_2D,null)):(this.baseTexture=h(e),e.activeTexture(e.TEXTURE0)),this.nopProgram=c(this.gl,`#version 300 es
			in vec2 position;
			out vec2 in_uv;

			void main() {
				in_uv = (position + 1.0) / 2.0;
				gl_Position = vec4(position * vec2(1.0, -1.0), 0.0, 1.0);
			}
		`,`#version 300 es
			precision mediump float;

			in vec2 in_uv;
			uniform sampler2D u_texture;
			out vec4 out_color;

			void main() {
				out_color = texture(u_texture, in_uv);
			}
		`);const s=e.getAttribLocation(this.nopProgram,"position");e.vertexAttribPointer(s,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(s);for(const[u,n]of Object.entries(t.functions)){const o=this.extractUniformNamesFromShader(n.shader);this.registeredFunctions.set(u,{...n,id:u,uniforms:o})}}extractUniformNamesFromShader(t){const e=/uniform\s+\w+\s+(\w+)\s*;/g,i=[];let r;for(;(r=e.exec(t))!==null;)i.push(r[1].replace(/^u_/,""));return i}renderLayer(t,e,i=!1){const r=this.gl,s=this.registeredFunctions.get(t.functionId);if(s==null)return;const u=this.shaderCache.get(s.id),n=u??c(this.gl,`#version 300 es
			in vec2 position;
			uniform bool u_invert;
			out vec2 in_uv;

			void main() {
				in_uv = (position + 1.0) / 2.0;
				gl_Position = u_invert ? vec4(position * vec2(1.0, -1.0), 0.0, 1.0) : vec4(position, 0.0, 1.0);
			}
		`,s.shader);u==null&&this.shaderCache.set(s.id,n),r.useProgram(n);const o=r.getUniformLocation(n,"in_resolution");r.uniform2fv(o,[this.renderWidth,this.renderHeight]);const a=r.getUniformLocation(n,"u_invert");r.uniform1i(a,i?1:0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,e);const f=r.getUniformLocation(n,"in_texture");r.uniform1i(f,0),s.main({gl:r,program:n,params:t.params,u:Object.fromEntries(s.uniforms.map(l=>[l,r.getUniformLocation(n,"u_"+l)])),width:this.renderWidth,height:this.renderHeight,textures:this.registeredTextures}),r.drawArrays(r.TRIANGLES,0,6)}render(t){const e=this.gl;if(t.length===0){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.baseTexture),e.useProgram(this.nopProgram),e.uniform1i(e.getUniformLocation(this.nopProgram,"u_texture"),0),e.drawArrays(e.TRIANGLES,0,6);return}let i=this.baseTexture;for(const r of t){const s=r===t.at(-1),u=this.perLayerResultTextures.get(r.id),n=u??h(e);if(u==null&&this.perLayerResultTextures.set(r.id,n),e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.renderWidth,this.renderHeight,0,e.RGBA,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,null),s)e.bindFramebuffer(e.FRAMEBUFFER,null);else{const o=this.perLayerResultFrameBuffers.get(r.id),a=o??e.createFramebuffer();o==null&&this.perLayerResultFrameBuffers.set(r.id,a),e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0)}this.renderLayer(r,i,s),i=n}}registerTexture(t,e){const i=this.gl,r=this.registeredTextures.get(t);r!=null&&(i.deleteTexture(r.texture),this.registeredTextures.delete(t));const s=h(i);i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,s),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,e.width,e.height,0,i.RGBA,i.UNSIGNED_BYTE,e),i.bindTexture(i.TEXTURE_2D,null),this.registeredTextures.set(t,{texture:s,width:e.width,height:e.height})}unregisterTexture(t){const e=this.gl,i=this.registeredTextures.get(t);i!=null&&(e.deleteTexture(i.texture),this.registeredTextures.delete(t))}hasTexture(t){return this.registeredTextures.has(t)}getKeysOfRegisteredTextures(){return this.registeredTextures.keys()}changeResolution(t,e){this.renderWidth===t&&this.renderHeight===e||(this.renderWidth=t,this.renderHeight=e,this.canvas&&(this.canvas.width=this.renderWidth,this.canvas.height=this.renderHeight),this.gl.viewport(0,0,this.renderWidth,this.renderHeight))}destroy(t=!0){this.gl.deleteProgram(this.nopProgram);for(const e of this.shaderCache.values())this.gl.deleteProgram(e);this.shaderCache.clear();for(const e of this.perLayerResultTextures.values())this.gl.deleteTexture(e);this.perLayerResultTextures.clear();for(const e of this.perLayerResultFrameBuffers.values())this.gl.deleteFramebuffer(e);this.perLayerResultFrameBuffers.clear();for(const e of this.registeredTextures.values())this.gl.deleteTexture(e.texture);if(this.registeredTextures.clear(),this.gl.deleteTexture(this.baseTexture),t){const e=this.gl.getExtension("WEBGL_lose_context");e&&e.loseContext()}}}export{x as I,T as d};
