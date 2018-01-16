//check off Task by clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

//click on X to delete Task
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();
});

$("input[type = 'text']").keypress(function(event){
	if(event.which === 13){
	 //new task entered by user
	 var task = $(this).val();
	 $(this).val("");
	 //create a new li and add to ul
	 $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + task + "</li>");

	}
});

$(".fa-plus").click(function(){
 $("input[type = 'text']").fadeToggle();
});

