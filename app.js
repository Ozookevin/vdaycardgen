function Collection(imgID) {
    var imgElem = document.getElementById(imgID);
    var cachedImages = [];
  
    this.selectImage = function () {
      imgElem.src = cachedImages[cachedImages.length - 1] || "";
      document.getElementById("prev_btn").disabled = cachedImages.length < 2;
    };
  
    this.next = function () {
      fetch("http://127.0.0.1:5000/images/next")
        .then((response) => response.blob())
        .then((blob) => {
          const objectUrl = URL.createObjectURL(blob);
          cachedImages.push(objectUrl);
          if (cachedImages.length > 5) {
            URL.revokeObjectURL(cachedImages.shift());
          }
          this.selectImage();
        })
        .catch((error) => console.error(error));
    };
  
    this.prev = function () {
      if (cachedImages.length < 2) {
        return;
      }
  
      URL.revokeObjectURL(cachedImages.pop());
      this.selectImage();
    };
  
    // initialize
    fetch("http://127.0.0.1:5000/images")
      .then((response) => response.blob())
      .then((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        cachedImages.push(objectUrl);
        this.selectImage();
      })
      .catch((error) => console.error(error));
  }
  
  var myCollection = new Collection("mainImg");
  
  document.getElementById("next_btn").onclick = function () {
    myCollection.next();
  };
  
  document.getElementById("prev_btn").onclick = function () {
    myCollection.prev();
  };
  