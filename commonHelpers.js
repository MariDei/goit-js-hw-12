import{a as L,i as d,S}from"./assets/vendor-6e0bf343.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const w="https://pixabay.com/api/",v="43235331-b9827a4a5560b952e70d62539";async function m(r,a){const{data:t}=await L(`${w}`,{params:{key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:a}});return console.log(t),t}function g(r){return r.map(({webformatURL:a,largeImageURL:t,tags:i,likes:e,views:o,comments:n,downloads:b})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${t}">
            <img
              class="gallery-image"
              src="${a}"
              alt="${i}"
              width = "360"
              height = "200"
            />
            <ul class="image-info">
              <li class="item-info">Likes <span>${e}</span></li>
              <li class="item-info">Views <span>${o}</span></li>
              <li class="item-info">Comments <span>${n}</span></li>
              <li class="item-info">Downloads <span>${b}</span></li>
            </ul>
          </a>
        </li>
    `).join("")}const p=document.querySelector(".search-form"),u=document.querySelector("#image"),f=document.querySelector(".gallery"),c=document.querySelector(".loader"),s=document.querySelector(".load-more");p.addEventListener("submit",C);s.addEventListener("click",P);let l=1,y="",q;async function C(r){if(r.preventDefault(),l=1,y=u.value,f.innerHTML="",s.disabled=!1,u.value.trim()===""){d.warning({title:"Caution",message:"Search field cannot be empty!",messageColor:"#fff",backgroundColor:"#ffa000",position:"topRight"});return}const{image:a}=r.currentTarget.elements;c.style.display="inline-block",await m(a.value,l).then(t=>{if(t.hits.length===0){d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight"});return}p.reset(),f.insertAdjacentHTML("beforeend",g(t.hits));const i=Math.ceil(t.totalHits/t.hits.length);l<=i&&s.classList.replace("load-more-hidden","load-more"),h()}).catch(t=>alert(t)).finally(()=>{c.style.display="none"}),u.value=""}async function P(){s.disabled=!0,l+=1;try{const r=await m(y,l);f.insertAdjacentHTML("beforeend",g(r.hits)),h(),c.style.display="inline-block",s.disabled=!1;const t=document.querySelector(".gallery-item").getBoundingClientRect().height;if(window.scrollBy({left:0,top:t*2,behavior:"smooth"}),l>q){s.classList.replace("load-more","load-more-hidden"),d.info({title:"Info",message:"We're sorry, but you've reached the end of search results",messageColor:"#fff",backgroundColor:"#59a10d",position:"topRight"});return}}catch(r){alert(r.message)}c.style.display="none"}function h(){new S(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
