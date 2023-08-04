function getSearchVolume() {
  const keywordInput = document.getElementById("keywordInput").value;
  fetch(`/api/searchVolume/${keywordInput}`)
    .then((response) => response.json())
    .then((data) => {
      const resultElement = document.getElementById("result");
      resultElement.innerText = `Search volume for "${data.keyword}" is ${data.searchVolume}.`;
    })
    .catch((error) => console.error("Error:", error));
}
