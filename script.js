for (const img of document.querySelectorAll("img.fx")) {
  const { display } = getComputedStyle(img);
  const { width, height } = img.getBoundingClientRect();

  const wrapper = document.createElement("span");

  // replace img by wrapper
  wrapper.setAttribute("style", `display:${display};width:${width};height:${height};`);
  wrapper.classList.add("fxwrap");
  img.parentNode.replaceChild(wrapper, img);

  // add original <img> to wrapper
  wrapper.appendChild(img);

  // add overlay layer to wrapper
  const overlay = `<img src=${img.src} class="fxoverlay">`;
  wrapper.insertAdjacentHTML("beforeend", overlay);
}
