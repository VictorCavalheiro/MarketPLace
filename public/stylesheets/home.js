
$(document).ready(function(){
  var cards   = document.querySelectorAll(".card");
  var descrips = document.querySelectorAll(".desc");
  for (var i = 0; i < cards.length; i++) {
        cards[i].desc = descrips[i];
        cards[i].addEventListener("mouseover", function(){
              this.desc.style.display  = "block";
              this.classList.add('selected');
        });
        cards[i].addEventListener("mouseout", function(){
              this.desc.style.display  = "none";
              this.classList.remove('selected');
        });
  }
  
});
