$(function() {
    $.get('/blocks', appendToList);

    function appendToList(blocks) {
        var list = [];
        var content, block;
        for(var i in blocks){
            block = blocks[i];
            content = '<a href= "/blocks/' + block + '">' + block + '</a>' + 
            '<a href ="#" data-block = "'+block+'"><img src="del.jpg"></a>'; // link to each block description
            list.push($('<li>', { text: content }));
        }
        $('.block-list').append(list);
    }
  $('form').on('submit', function(event) {
       event.preventDefault();
       var form = $(this);
       var blockData = form.serialize();//transforms form data to url encoded notation
    });

    $.ajax({
        type: 'POST', url: '/blocks', data: blockData
    }).done(function(blockName){ // recently created block data
       appendToList([blockName]); // array with new block as its single argument
       form.trigger('reset'); // cleans up form text input
    });
    
    $('.block-list').on('click', 'a[data-block]', function(event) {
      
        if(!confirm('Are you sure ?')) {
           return false;
        }
        
        var target = $(event.currentTarget);
        $.ajax({
            type: 'DELETE', url: '/blocks/' + target.data('block')
        }).done(function() {
            
           target.parents('li').remove();  //removes li element containing the link
        });

    })

});