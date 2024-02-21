const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".bx-search");

// search input and button
searchInput.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    fetchInfo();
    searchInput.value = "";
  }
});

searchBtn.addEventListener("click", () => {
  fetchInfo();
  searchInput.value = "";
});

// focus search input
window.addEventListener("load", () => {
  searchInput.focus();
});

// fetch vocabularies' information
const noWordExists = document.querySelector(".no-word-exists");
const fetchInfo = () => {
  let inputValue = searchInput.value;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
    .then((res) => res.json())
    .then((res1) => vocabInfo(res1))
    .catch(() => {
      noWordExists.classList.remove("hidden");
      definitionBox.innerHTML = "";
      vocabBox.innerHTML = "";
    });
};

// insert fetched information into DOM
const vocabBox = document.querySelector(".vocab-box");
const definitionBox = document.querySelector(".definition-box");

const vocabInfo = (vocab) => {
  // show proper main vocab container
  vocabContainer();
  noWordExists.classList.add("hidden");

  // header vocab info
  vocabBox.innerHTML = "";
  vocabBox.insertAdjacentHTML(
    "beforeend",
    `
  <div class="text-[#3571df] pb-4 border-b">
      <h1 class="font-bold text-4xl inline-block sm:text-3xl">${
        vocab[0].word
      } </h1>
      <i class="bx bxs-volume-full font-bold text-2xl pb-4 pl-4 cursor-pointer sm:text-xl" onclick="audioHandler(event)"> <audio src="${
        vocab[0].phonetics[0].audio ||
        vocab[0].phonetics[1].audio ||
        vocab[0].phonetics[2].audio ||
        vocab[0].phonetics[3].audio
      }" controls class="hidden audio-player"></audio> </i>
      <div class="flex items-center">
          <p> ${
            vocab[0].phonetics[1].text ? vocab[0].phonetics[1].text : ""
          } </p>
          <i class="bx bxs-circle text-[.5rem] mx-2"></i>
          <p> ${vocab[0].meanings[0].partOfSpeech} </p>
      </div>
  </div>
`
  );

  // further vocab info
  definitionBox.innerHTML = "";
  vocab.forEach((element) => {
    definitionBox.insertAdjacentHTML(
      "beforeend",
      ` <div class="mb-3">
    <p>
        <span class="text-[#3571df] font-bold">${
          vocab.indexOf(element) + 1
        }. </span>${element.meanings[0].definitions[0].definition} [${
        element.meanings[0].partOfSpeech
      }]</p>
    <p class="pl-8 text-neutral-500">${
      element.meanings[0].definitions[0].example
        ? element.meanings[0].definitions[0].example
        : ""
    }</p>
    <p class="text-neutral-600 synonym-antonym-container"><span class="text-[#3571df]">Synonym: </span> <span class="synonym-antonym-text">${
      element.meanings[0].synonyms[0] ? element.meanings[0].synonyms[0] : ""
    }</span></p>
    <p class="text-neutral-600 synonym-antonym-container"><span class="text-[#3571df]">Antonym: </span> <span class="synonym-antonym-text">${
      element.meanings[0].antonyms[0] ? element.meanings[0].antonyms[0] : ""
    }</span></p>
</div>`
    );

    // check whether synonyms and antonyms exist or not
    var synonymAntonymElements = document.querySelectorAll(
      ".synonym-antonym-container"
    );
    synonymAntonymElements.forEach((synAntElem) => {
      var synonymAntonymText = synAntElem.querySelector(
        ".synonym-antonym-text"
      ).textContent;
      if (!synonymAntonymText || typeof synonymAntonymText === "undefined") {
        synAntElem.style.display = "none";
      }
    });
  });
};

// vocab audio handler
const audioHandler = (e) => {
  const audioPlayer = e.target.querySelector(".audio-player");
  audioPlayer.play();
};

// main vocab container style
const mainVocabContainer = document.querySelector(".main-vocab-container");
const vocabContainer = () => {
  mainVocabContainer.classList.add(
    "bg-white",
    "w-11/12",
    "h-fit",
    "mx-auto",
    "my-10",
    "p-6"
  );
};
