import{a as S,i as d,S as w}from"./assets/vendor-6e0bf343.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const v="https://pixabay.com/api/",q="43235331-b9827a4a5560b952e70d62539";async function p(r,s){const{data:t}=await S(`${v}`,{params:{key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s}});return console.log(t),t}function g(r){return r.map(({webformatURL:s,largeImageURL:t,tags:n,likes:e,views:o,comments:l,downloads:L})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${t}">
            <img
              class="gallery-image"
              src="${s}"
              alt="${n}"
              width = "360"
              height = "200"
            />
            <ul class="image-info">
              <li class="item-info">Likes <span>${e}</span></li>
              <li class="item-info">Views <span>${o}</span></li>
              <li class="item-info">Comments <span>${l}</span></li>
              <li class="item-info">Downloads <span>${L}</span></li>
            </ul>
          </a>
        </li>
    `).join("")}const h=document.querySelector(".search-form"),c=document.querySelector("#image"),u=document.querySelector(".gallery"),m=document.querySelector(".loader"),a=document.querySelector(".load-more");h.addEventListener("submit",C);a.addEventListener("click",P);let i=1,y="",f;async function C(r){if(r.preventDefault(),u.innerHTML="",y=c.value,a.disabled=!1,a.classList.replace("load-more","load-more-hidden"),i=1,c.value.trim()===""){a.disabled=!0,a.classList.replace("load-more","load-more-hidden"),d.warning({title:"Caution",message:"Search field cannot be empty!",messageColor:"#fff",backgroundColor:"#ffa000",position:"topRight"});return}const{image:s}=r.currentTarget.elements;m.style.display="inline-block",await p(s.value,i).then(t=>{if(t.hits.length===0){a.disabled=!0,a.classList.replace("load-more","load-more-hidden"),d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight"});return}h.reset(),u.insertAdjacentHTML("beforeend",g(t.hits)),f=Math.ceil(t.totalHits/t.hits.length),i<f&&a.classList.replace("load-more-hidden","load-more"),b()}).catch(t=>alert(t)).finally(()=>{m.style.display="none"}),c.value=""}async function P(){a.disabled=!0,i+=1;try{const r=await p(y,i);u.insertAdjacentHTML("beforeend",g(r.hits)),b(),a.disabled=!1,m.style.display="none";const t=document.querySelector(".gallery-item").getBoundingClientRect().height;if(window.scrollBy({left:0,top:t*2,behavior:"smooth"}),i>=f){a.classList.replace("load-more","load-more-hidden"),d.info({title:"Info",message:"We're sorry, but you've reached the end of search results",messageColor:"#fff",backgroundColor:"#59a10d",position:"topRight"});return}}catch(r){alert(r.message)}}function b(){new w(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
