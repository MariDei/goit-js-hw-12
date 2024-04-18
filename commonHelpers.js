import{a as S,i as u,S as w}from"./assets/vendor-6e0bf343.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const v="https://pixabay.com/api/",q="43235331-b9827a4a5560b952e70d62539";async function p(o,i){const{data:t}=await S(`${v}`,{params:{key:q,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:i}});return console.log(t),t}function g(o){return o.map(({webformatURL:i,largeImageURL:t,tags:n,likes:e,views:r,comments:l,downloads:L})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${t}">
            <img
              class="gallery-image"
              src="${i}"
              alt="${n}"
              width = "360"
              height = "200"
            />
            <ul class="image-info">
              <li class="item-info">Likes <span>${e}</span></li>
              <li class="item-info">Views <span>${r}</span></li>
              <li class="item-info">Comments <span>${l}</span></li>
              <li class="item-info">Downloads <span>${L}</span></li>
            </ul>
          </a>
        </li>
    `).join("")}const y=document.querySelector(".search-form"),d=document.querySelector("#image"),m=document.querySelector(".gallery"),c=document.querySelector(".loader"),a=document.querySelector(".load-more");y.addEventListener("submit",C);a.addEventListener("click",P);let s=1,h="",f;async function C(o){if(o.preventDefault(),s=1,h=d.value,m.innerHTML="",a.disabled=!1,d.value.trim()===""){a.disabled=!0,a.classList.replace("load-more","load-more-hidden"),u.warning({title:"Caution",message:"Search field cannot be empty!",messageColor:"#fff",backgroundColor:"#ffa000",position:"topRight"});return}const{image:i}=o.currentTarget.elements;c.style.display="inline-block",await p(i.value,s).then(t=>{if(t.hits.length===0){a.disabled=!0,a.classList.replace("load-more","load-more-hidden"),u.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight"});return}y.reset(),m.insertAdjacentHTML("beforeend",g(t.hits)),f=Math.ceil(t.totalHits/t.hits.length),s<f&&a.classList.replace("load-more-hidden","load-more"),b()}).catch(t=>alert(t)).finally(()=>{c.style.display="none"}),d.value=""}async function P(){a.disabled=!0,s+=1;try{const o=await p(h,s);m.insertAdjacentHTML("beforeend",g(o.hits)),b(),c.style.display="inline-block",a.disabled=!1;const t=document.querySelector(".gallery-item").getBoundingClientRect().height;if(window.scrollBy({left:0,top:t*2,behavior:"smooth"}),s>=f){a.disabled=!0,a.classList.replace("load-more","load-more-hidden"),c.style.display="none",u.info({title:"Info",message:"We're sorry, but you've reached the end of search results",messageColor:"#fff",backgroundColor:"#59a10d",position:"topRight"});return}}catch(o){alert(o.message)}}function b(){new w(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
