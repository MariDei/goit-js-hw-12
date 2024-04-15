import{a as b,i as m,S as L}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const S="https://pixabay.com/api/",w="43235331-b9827a4a5560b952e70d62539";async function d(r,t){const{data:a}=await b(`${S}`,{params:{key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}});return console.log(a),a}function f(r){return r.map(({webformatURL:t,largeImageURL:a,tags:i,likes:e,views:o,comments:s,downloads:h})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${a}">
            <img
              class="gallery-image"
              src="${t}"
              alt="${i}"
              width = "360"
              height = "200"
            />
            <ul class="image-info">
              <li class="item-info">Likes <span>${e}</span></li>
              <li class="item-info">Views <span>${o}</span></li>
              <li class="item-info">Comments <span>${s}</span></li>
              <li class="item-info">Downloads <span>${h}</span></li>
            </ul>
          </a>
        </li>
    `).join("")}const g=document.querySelector(".search-form"),c=document.querySelector("#image"),p=document.querySelector(".gallery"),u=document.querySelector(".loader"),l=document.querySelector(".load-more");let n=1;g.addEventListener("submit",q);l.addEventListener("click",v);function q(r){if(r.preventDefault(),r.currentTarget.elements,u.style.display="inline-block",sessionStorage.setItem("image",c.value),n=1,c.value.trim()===""){m.warning({title:"Caution",message:"Search field cannot be empty!",messageColor:"#fff",backgroundColor:"#ffa000",position:"topRight"});return}d(c.value).then(t=>{t.total===0&&m.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight"}),p.innerHTML=f(t.hits),n<=t.totalHits&&l.classList.replace("load-more-hidden","load-more"),y()}).catch(t=>alert(t)).finally(()=>{u.style.display="none"}),c.value="",g.reset()}async function v(){l.disabled=!0;try{const r=sessionStorage.getItem("image"),t=await d(r,n);p.insertAdjacentHTML("beforeend",f(t.hits)),n+=1,l.disabled=!1;const i=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:i*2,behavior:"smooth"}),n>t.totalHits&&l.classList.replace("load-more","load-more-hidden")}catch(r){alert(r.message)}y()}function y(){new L(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
