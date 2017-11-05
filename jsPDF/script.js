$(document).ready(function(){
  var htmlSource = $('#body')[0];
  
  function oldBusted(){
    var pdf = new jsPDF('l','px');
      
      pdf.addHTML(
        htmlSource, 0, 0, { pagesplit: true },
        function(dispose){
          pdf.save('old_n_busted.pdf');
        }
      );
  }
  
  function alsoBusted(){
    var pdf = new jsPDF('l','px');
    pdf.fromHTML(
      htmlSource,0,0,{ width: 300 },
      function(dispose){
        pdf.save('also_busted.pdf');
      });
  }
  
  function newHotness(){
    html2canvas(htmlSource,{
      onrendered: function(canvas){
        canvas.toBlob(function(blob){
          var urlCreator = window.URL || window.webkitURL;
          var imgUrl = urlCreator.createObjectURL(blob);
          var img = new Image();
          img.src = imgUrl;
          img.onload = function(){
            var pdf = new jsPDF('p','px', [img.width, img.height]);
            pdf.addImage(img, 0, 0, img.width, img.height);
            pdf.save('new_hotness.pdf');
          }
        });
      }
    });
  }
  
  function newHotness2(){
    
    var pdf = new jsPDF2('l'),
        pdfInternals = pdf.internal,
        pdfPageSize = pdfInternals.pageSize,
        pdfScaleFactor = pdfInternals.scaleFactor,
        pdfPageWidth = pdfPageSize.width,
        pdfPageHeight = pdfPageSize.height,
        pdfPageWidthPx = pdfPageWidth * pdfScaleFactor,
        // pdfPageHeightPx = pdfPageHeight * pdfScaleFactor,
        // pdfPageRatio = pdfPageWidth / pdfPageHeight,
        count = 0;
    var addPage = function(img, height, width){
      pdf.addImage(img, 0, -(pdfPageHeight * count), width, height);
      count++;
      if((pdfPageHeight * count) < height){
        pdf.addPage();
        addPage(img, height, width);
      }
    }
    
    html2canvas(htmlSource,{
      onrendered: function(canvas){
        canvas.toBlob(function(blob){
          var urlCreator = window.URL || window.webkitURL;
          var imgUrl = urlCreator.createObjectURL(blob);
          var img = new Image();
          img.src = imgUrl;
          img.onload = function(){
            var width, height;
            if(img.width < pdfPageWidthPx){
              width = img.width / pdfScaleFactor;
            } else {
              width = pdfPageWidth;
            }
            height = img.height / (img.width / width);
            addPage(img, height, width, 0);
            // pdf.addImage(img, 0, 0, width, height);
            // pdf.addPage();
            // pdf.addImage(img, 0, -pdfPageHeight, width, height);
            pdf.save('new-hotness-two.pdf');
          };
        });
      }
    });
  }
  
  // wire up download buttons
  $('#oldBusted').on('click',oldBusted);
  $('#alsoBusted').on('click',alsoBusted);
  $('#newHotness').on('click',newHotness);
  $('#newHotness2').on('click',newHotness2);
});
