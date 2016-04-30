<template>
	<div id="overlay">
		<div id="progstat"></div>
		<div id="progress"></div>
	</div>
</template>

<script>
	(function(){
	  function id(v){return document.getElementById(v); }
	  function loadbar() {
	    var ovrl = id("overlay"),
	        prog = id("progress"),
	        stat = id("progstat"),
	        img = window.document.scripts,
	        c = 0,
	        tot = img.length;      
	        

	    function imgLoaded(){
	      c += 1;
	      var perc = ((100/tot*c) << 0) +"%";
	      prog.style.width = perc;
	      stat.innerHTML = "Loading "+ perc;
	      if(c===tot) return doneLoading();
	    }
	    function doneLoading(){
	      ovrl.style.opacity = 0;
	      setTimeout(function(){ 
	        ovrl.style.display = "none";
	      }, 1200);
	    }
	    for(var i=0; i<tot; i++) {
	      var tImg     = new Image();
	      tImg.onload  = imgLoaded;
	      tImg.onerror = imgLoaded;
	      tImg.src     = img[i].src;
	    }    
	  }
	  document.addEventListener('DOMContentLoaded', loadbar, false);
	}());	
</script>

<style scoped>
	#overlay{
	  position:fixed;
	  z-index:99999;
	  top:0;
	  left:0;
	  bottom:0;
	  right:0;
	  background:rgba(0,0,0,1);
	  transition: 1s 0.4s;
	}
	#progress{
	  height:1px;
	  background:#fff;
	  position:absolute;
	  width:0;
	  top:50%;
	}
	#progstat{
	  font-size:0.7em;
	  letter-spacing: 3px;
	  position:absolute;
	  top:50%;
	  margin-top:-40px;
	  width:100%;
	  text-align:center;
	  color:#fff;
	}
</style>
