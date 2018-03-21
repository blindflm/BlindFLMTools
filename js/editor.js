var tap = 0.31;
var drag = 0.17;
var flick = 0.12;
var dtap = 0.62;
var mental = 1.35;
var response = 0.0;

var keywords = ["BFLM_Tap", "BFLM_Drag", "BFLM_Flick", "BFLM_DoubleTap", "BFLM_MentalAct", "BFLM_SystemResponse"];


 CodeMirror.defineMode("mymode", function() {

  return {
    token: function(stream, state) {
      stream.eatWhile(/\w/);

      if (arrayContains(stream.current(), keywords)) {
        return "style1";
      }
      stream.next();
    }
  };

});

function arrayContains(needle, arrhaystack) {
  //var lower = needle.toLowerCase();
   var  lower = needle;
  return (arrhaystack.indexOf(lower) > -1);
}



$(document).ready(function() {
   
    
    var boldcounter = 0;
    var italiccounter = 0;
    // tooltips on hover
    $('[data-toggle=\'tooltip\']').tooltip({container: 'body', html: true});

    // Makes tooltips work on ajax generated content
    $(document).ajaxStop(function() {
        $('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
    });

    $('[data-toggle=\'tooltip\']').on('remove', function() {
        $(this).tooltip('destroy');
    });


    //var editor = document.getElementById('text-editor');

    $("#text-editor").each(function (i) {
        
        editor = CodeMirror.fromTextArea(this, {
            lineNumbers: true,
            //mode: 'html'
            mode: 'mymode'
            
        });
        
        var i = 0;
        var n = 0;

        editor.on("change", function() {
            
            //i = i + 1;
           // document.getElementById('question-preview').innerHTML = editor.getValue()
           // var editorval = editor.getValue().length;
            var editorval = editor.getValue();
            // the two lines below finds b and then return the index and prints it in the question preview area
            //var test = editorval.search("<b>");
            //document.getElementById('question-preview').innerHTML = (indexes(editorval, " Tap").length)*tap
            //document.getElementById('question-preview').innerHTML = Math.round(equation(editorval) * 100) / 100;
            document.getElementById('time').innerHTML = (Math.round(equation(editorval) * 100) / 100) + 's'
            //var matches_array = editorval.match('<b>');
            //document.getElementById('question-preview').innerHTML = matches_array.length
           // .replace('<?','&lt;?')
            //.replace('?>', '?&gt;')
           // .replace('<script>', '&lt;script&gt;')
           // .replace('<script>', '&lt;/script&gt;')
           // .replace('<div>', '&lt;div&gt;')
           // .replace('</div>', '&lt;/div&gt;')
            
        });

        //$('#hr').append('<hr />');

        $('a[role="button"]').click(function(){

            var val = $(this).data('val');
            var string = editor.getSelection();
              
            switch(val){
                
                case 'Tap': 
                    editor.replaceSelection('BFLM_Tap ' + string);
                    //boldcounter = boldcounter + 1;
                break;

                case 'Drag': 
                    editor.replaceSelection('BFLM_Drag ' + string);
                break;
                    
                case 'Flick':
                    editor.replaceSelection('BFLM_Flick ' + string);
                break;
                    
                case 'Dtap':
                    editor.replaceSelection('BFLM_DoubleTap ' + string);
                break;
                    
                case 'Mental':
                    editor.replaceSelection('BFLM_MentalAct ' + string);
                break;
                
                case 'Response':
                    editor.replaceSelection('BFLM_SystemResponse ' + string);
                break;

                /*case 'quote': 
                    editor.replaceSelection('<blockquote><p>' + string + '</p></blockquote>');
                break;

                case 'code': 
                    editor.replaceSelection('<pre><code>' + string + '</code></pre>');
                    
                break;

                case 'hr': 
                    editor.replaceSelection('<hr/>');
                    
                break;*/
            }

        });

        /*$(".dropdown-menu li a[class='btn-heading']").click(function(){
            var val = $(this).data('val');
            var string = editor.getSelection();

            switch(val){
                case 'h1': 
                    editor.replaceSelection('<h1>' + string + '</h1>');
                break;
                case 'h2': 
                    editor.replaceSelection('<h2>' + string + '</h2>');
                break;
                case 'h3': 
                    editor.replaceSelection('<h3>' + string + '</h3>');
                break;
                case 'h4': 
                    editor.replaceSelection('<h4>' + string + '</h4>');
                break;
                case 'h5': 
                    editor.replaceSelection('<h5>' + string + '</h5>');
                break;
                case 'h6': 
                    editor.replaceSelection('<h6>' + string + '</h6>');
                break;
            }
        });*/
    });
});


function indexes(source, find) {
  var result = [];
  for (i = 0; i < source.length; ++i) {
    // If you want to search case insensitive use 
    // if (source.substring(i, i + find.length).toLowerCase() == find) {
    if (source.substring(i, i + find.length) == find) {
      result.push(i);
    }
  }
  return result;
}

function equation(source){
    var result;
    var t = 0.0;
    var d = 0.0;
    var f = 0.0;
    var dt = 0.0;
    var m = 0.0;
    var r = 0.0;
    
    t = indexes(source, "BFLM_Tap").length;
    d = indexes(source, "BFLM_Drag").length;
    f = indexes(source, "BFLM_Flick").length;
    dt = indexes(source, "BFLM_DoubleTap").length;
    m = indexes(source, "BFLM_MentalAct").length;
    r = indexes(source, "BFLM_SystemResponse").length;
    
    result = (t*tap) + (d*drag) + (f*flick) + (dt*dtap) + (m*mental) + (r*response);
    
    return result;
}


function downloadFile(){
    var textToSave = editor.getValue();
    textToSave += "\n" + document.getElementById('time').innerHTML;
   // var editor = CodeMirror.fromTextArea();
    //var editor = document.getElementById('text-editor');
    //var textToSave = document.getElementById('text-editor').getValue();
    //var textToSave = document.querySelector('.text-editor');
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'BlindFLM_model.txt';
    hiddenElement.click();
}