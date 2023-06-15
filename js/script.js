$(document).ready(function() {
  preview("an");
  // default audio preview on load
  // set card to show 1 card by default
  maxCards = 1;
  initialCards(maxCards);
  // set collapse to show 3 cards by default
  maxCollapseCards = 3;
  initialCollapseCards(maxCollapseCards);
  initialPanels(maxCollapseCards);
  initialButtongroupbuttons(maxCollapseCards);
  initialBreadcrumbs(maxCollapseCards);
  preview("dl");
  preview("panelgroup");
  preview("btngroup");
  preview("brcr");
  // set list to show 3 items by default
  maxListItems = 3;
  initialListItems(maxListItems);
});

/**********************************
 * button                         *
 **********************************/

// sets button style
$("#btn-style").change(function() {
	
var buttonstyle = $(this).val();
$("#code-btn-class-style").text("buttons " + buttonstyle);
var headerinput = document.getElementById("btn-header-input");
if ($(this).val() != "block-buttons blue-border") {
	headerinput.classList.add("hidden");
	document.getElementById("btn-header").value = '';
	$("#code-btn-header").text( $("#btn-header").val() != "" ? '<h3>' + $("#btn-header").val() + '</h3>': "" );
	preview("btn");
} else { 
	headerinput.classList.remove("hidden");
}
		preview("btn");
});

// sets button header
$("#btn-header").change(function() {
	$("#code-btn-header").text( $("#btn-header").val() != "" ? '<h3>' + $("#btn-header").val() + '</h3>': "" );
  preview("btn");
});


// generates button text from input
updateText("btn", "#btn-text", "#code-btn-text", "Button Text");

// generates link text from input
updateText("btn", "#btn-link", "#code-btn-link", "#");

/**********************************
 * Breadcrumbs                    *
 **********************************/

// on select change, show only the required no of list items to edit, update code and preview
$("#brcr-item-no").on('focus', function() {
  $(this).data("previous",$(this).val());
  $(this).blur();
  $("#brcr-item-no").change(function(data){
    newMax = Number(($(this).val()));
    oldMax = Number(($(this).data("previous")));
    // compare old and new max list item value
    if (newMax > oldMax) {
      for (let i = oldMax; i < newMax; i++) {
        // add new items
        breadcrumbItem = createBreadcrumbItem(i+1);
        $("#code-brcr-items").append(breadcrumbItem);
        card = createBreadcrumbItemEditorCard(i+1);
        $("#brcr-items").append(card);
		$('#brcr-item-'+newMax+'-link').hide();
		$('#brcr-item-'+oldMax+'-link').show();
		$('#brcr-item-'+newMax+'-link-label').hide();
		$('#brcr-item-'+oldMax+'-link-label').show();
		$('#brcr-item-'+newMax+'-link').text(" ");
		$('#code-brcr-item-'+newMax+'-open').text("");
		$('#code-brcr-item-'+newMax+'-link').text("");
		$('#code-brcr-item-'+newMax+'-title-open').text("");
		$('#code-brcr-item-'+newMax+'-link-title').text("");
		$('#code-brcr-item-'+newMax+'-title-close').text("");
		$('#code-brcr-item-'+newMax+'-spacer').text("");
		$('#code-brcr-item-'+oldMax+'-open').text(`<a href="`);
		$('#code-brcr-item-'+oldMax+'-link').text("#");
		$('#code-brcr-item-'+oldMax+'-title-open').text(`"`);
		$('#code-brcr-item-'+oldMax+'-title-close').text(`>`);
		$('#code-brcr-item-'+oldMax+'-spacer').text(`<span class="breadcrumb-spacer"></span>`);
      }
    } else {
      for (let i = newMax; i < oldMax; i++) {
        // remove items
        $("#code-brcr-item-"+(i+1)).remove();
        $("#brcr-item-"+(i+1)+"-card").remove();
		$('#brcr-item-'+newMax+'-link').hide();
		$('#brcr-item-'+oldMax+'-link').show();
		$('#brcr-item-'+newMax+'-link-label').hide();
		$('#brcr-item-'+oldMax+'-link-label').show();
		$('#code-brcr-item-'+newMax+'-open').text("");
		$('#code-brcr-item-'+newMax+'-link').text("");
		$('#code-brcr-item-'+newMax+'-title-open').text("");
		$('#code-brcr-item-'+newMax+'-title-close').text("");
		$('#code-brcr-item-'+newMax+'-spacer').text("");
      }
    }
    // reset previous value
    $(this).removeData("previous");
    preview("brcr");
  });
});


// create all list item editor cards and code on page load
function initialBreadcrumbs(maxCollapseCards) {
  for (let i = 1; i <= maxCollapseCards; i++) {
    breadcrumbItem = createBreadcrumbItem(i);
    $("#code-brcr-items").append(breadcrumbItem);
    brcrCard = createBreadcrumbItemEditorCard(i);
    $("#brcr-items").append(brcrCard);
	$('#brcr-item-'+maxCollapseCards+'-link').hide();
	$('#brcr-item-'+maxCollapseCards+'-link-label').hide();
	$('#code-brcr-item-'+maxCollapseCards+'-open').text("");
	$('#code-brcr-item-'+maxCollapseCards+'-link').text("");
	$('#code-brcr-item-'+maxCollapseCards+'-title-open').text("");
	$('#code-brcr-item-'+maxCollapseCards+'-title-close').text("");
	$('#code-brcr-item-'+maxCollapseCards+'-spacer').text("");
  }
  preview("brcr");
}

// create single list item code, shows first card and collapses all others
function createBreadcrumbItem(i) {
  return `<span class="code-brcr-item" id="code-brcr-item-${i}"><span class="code-open-tag"><span id="code-brcr-item-${i}-open">&lt;a href="</span><span id="code-brcr-item-${i}-link">#</span><span id="code-brcr-item-${i}-title-open">"</span><span id="code-brcr-item-${i}-title-close">&gt;</span><span class="code-brcr-item-${i}-title">#</span><span class="code-close-tag">&lt;&#47;a&gt;</span><span id="code-brcr-item-${i}-spacer">&lt;span class="breadcrumb-spacer">&lt/span></span></span>`;
}

// create single card editor card, shows first card and collapses all others
function createBreadcrumbItemEditorCard(i) {
  return `
<div class="input-group mb-3" id="brcr-item-${i}-card">
	<div class="col-md-6">
  <div class="input-group-prepend">
  <label class="input-group-text" for="brcr-item-${i}-title">Title</label>
  </div>
  <input type="text" class="form-control" id="brcr-item-${i}-title" aria-label="Breadcrumb title">
  </div>
  <div class="col-md-6">
  <div class="input-group-prepend">
  <label class="input-group-text" for="brcr-item-${i}-link" id="brcr-item-${i}-link-label">Link</label>
  </div>
  <input type="text" class="form-control" id="brcr-item-${i}-link" aria-label="Breadcrumb link">
  </div>
</div>`;
}

// generate card text from input
updateBreadcrumbItems(8);

function updateBreadcrumbItems(maxCollapseCards) {
	console.log(maxCollapseCards);
  for (let i = 1; i <= maxCollapseCards; i++) {
    updateText("brcr", "#brcr-item-" + i + "-title", ".code-brcr-item-" + i + "-title", "#");
	updateText("brcr", "#brcr-item-" + i + "-link", "#code-brcr-item-" + i + "-link", "#");
	preview("brcr");
  }
}

/**********************************
 * card                           *
 **********************************/

// change card type between default card and float box
$("#cd-type").change(function(data){
  $(this).val() == "float-box"
    ? ( cdLayout(),
      showCardImgs(4),
      $(".cd-img-form").show(),
      $("#cd-layout-form, .cd-img-check").hide(),
      $(".code-cd-type, .code-cd-body-class").text("float-box"),
      $("#code-cd-img-container-open").html("div"),
      $("#code-cd-img-container-middle").html("&gt;\n&lt;img&gt;"),
      $("#code-cd-img-container-close").html("&lt;&#47;div&gt;\n&lt;&#47;div&gt;") )
    : ( $("#cd-layout-form, .cd-img-check").show(),
      $(".code-cd-type, .code-cd-body-class").text("card") );
  preview("cd");  
});

// on selet change, show only the required no of cards to edit, update code and preview
$("#cd-card-no").on('focus', function() {
  $(this).data("previous",$(this).val());
  $(this).blur();
  $("#cd-card-no").change(function(){
    newMax = Number(($(this).val()));
    oldMax = Number(($(this).data("previous")));
    // set layout to block for single card
    if (newMax == 1) $("#cd-layout").val("block").change();
    // remove card deck container for block layout
    ($("#cd-layout").val() == "block" || newMax == 1) ? $(".code-cd-deck").hide() : $(".code-cd-deck").show() ;
    // compare old and new max list item value
    if (newMax > oldMax) {
      for (let i = oldMax; i < newMax; i++) {
        // add new items
        card = createCard(i+1);
        $("#code-cd-cards").append(card);
        cdCard = createCardEditorCard(i+1);
        $("#cards").append(cdCard);
      }
    } else {
      for (let i = newMax; i < oldMax; i++) {
        // remove items
        $("#code-cd-card-"+(i+1)).remove();
        $("#cd-card-"+(i+1)).remove();
      }
    }
    // reset previous value
    $(this).removeData("previous");
    if ($("#cd-type").val() == "float-box") $(".cd-img-check").hide();
    preview("cd");
  });
});

// change card layout between vertical block and horizontal deck
$("#cd-layout").change(function(){
  cdLayout();
});

function cdLayout() {
  $("#cd-layout").val() == "deck" && $("#cd-type").val() == "default"
    ? ($("#code-cd-deck-open").text('<div class="card-deck">'),
      $("#code-cd-deck-close").text("</div>"),
      $(".code-cd-img-position").text("top"))
    : ($("#code-cd-deck-open, #code-cd-deck-close").empty(),
      $("#cd-layout").val("block"));
  preview("cd");  
};

// create all card editor cards and code on page load
function initialCards(maxCards) {
  for (let i = 1; i <= maxCards; i++) {
    card = createCard(i);
    $("#code-cd-cards").append(card);
    cdCard = createCardEditorCard(i);
    $("#cards").append(cdCard);
  }
  preview("cd");
}

// create single card card code
function createCard(i) {
  return `<span id="code-cd-card-${i}"><pre>  <span class="code-open-tag">&lt;div&#32;class&#61;&#34;<span class="code-cd-type">${ $("#cd-type").val() == "float-box" ? "float-box" : "card" }</span>&#34;&gt;</span><span id="code-cd-${i}-img">
    <span id="code-cd-${i}-img-open">&lt;<span id="code-cd-img-container-open">img</span>&#32;src&#61;&#34;</span><span id="code-cd-${i}-img-src">https:\/\/via.placeholder.com\/300</span><span id="code-cd-${i}-img-middle">&#34;</span><span id="code-cd-${i}-img-alt"></span>&gt;<span id="code-cd-img-container-close"></span></span></span>
    <span class="code-open-tag">&lt;div&#32;class&#61;&#34;<span class="code-cd-body-class">card</span>&#45;body&#34;&gt;</span><span id="code-cd-${i}-title">
      <span>&lt;h4&gt;</span><span id="code-cd-${i}-title-text">Card #${i} title</span><span>&lt;&#47;h4&gt;</span></span>
      <span class="code-open-tag">&lt;p&gt;</span><span id="code-cd-${i}-text">Card #${i} text</span><span class="code-close-tag">&lt;&#47;p&gt;</span>
    <span class="code-close-tag">&lt;&#47;div&gt;</span>
  <span class="code-close-tag">&lt;&#47;div&gt;</span></pre></span>`;
}

// create single card editor card, shows first card and collapses all others
function createCardEditorCard(i) {
  return `
    <div class="collapse-card cd-card ${ i == 1 ? "" : "collapsed" }" id="cd-card-${i}">
      <div class="collapse-header" id="cd-card-heading-${i}">
        <button class="btn btn-link"><h5 class="h4">Card #${i}</h5></button>
      </div>
      <div class="collapse-body" id="cd-collapse-${i}">
        <form>
          <div class="custom-control custom-checkbox cd-img-check">
            <input type="checkbox" class="custom-control-input checked" id="cd-${i}-check-img" checked>
            <label class="custom-control-label" for="cd-${i}-check-img"><span id="cd-${i}-toggle-img">Remove</span> image</label>
          </div>
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input checked" id="cd-${i}-check-title" checked>
            <label class="custom-control-label" for="cd-${i}-check-title"><span id="cd-${i}-toggle-title">Remove</span> title</label>
          </div>
          <div class="form-group cd-img-form cd-${i}-img-form" id="cd-${i}-img-src-form">
            <label for="cd-${i}-header">Img src</label>
            <input type="text" class="form-control" id="cd-${i}-img-src" placeholder="https://via.placeholder.com/300">
          </div>
          <div class="form-group cd-img-form cd-${i}-img-form" id="cd-${i}-img-alt-form">
            <label for="cd-${i}-header">Img alt text</label>
            <input type="text" class="form-control" id="cd-${i}-img-alt" placeholder="Description of image">
          </div>
          <div class="form-group" id="cd-${i}-title-form">
            <label for="cd-${i}-title">Title</label>
            <input type="text" class="form-control" id="cd-${i}-title" placeholder="Card #${i} title">
          </div>
          <div class="form-group">
            <label for="cd-${i}-text">Body text</label>
            <textarea class="form-control" id="cd-${i}-text" placeholder="Card #${i} text" rows="6"></textarea>
          </div>
        </form>
      </div>
    </div>
  `;
}

// generate card text from input
updateCards(4);

function updateCards(cardCardLimit) {
  for (let i = 1; i <= cardCardLimit; i++) {
    // toggle optional input fields
    toggleCheckboxText("#cd-" + i + "-check-img", "#cd-" + i + "-toggle-img");
    toggleCheckboxText("#cd-" + i + "-check-title", "#cd-" + i + "-toggle-title");
    toggleCheckbox("cd", "#cd-" + i + "-check-img", ".cd-" + i + "-img-form");
    toggleCheckbox("cd", "#cd-" + i + "-check-title", "#cd-" + i + "-title-form, #code-cd-" + i + "-title");
    // toggle img code
    $(document).on('click', "#cd-" + i + "-check-img", function (event) {
      $("#cd-" + i + "-check-img").hasClass("checked")
        ? $("#code-cd-" + i + "-img").html('\n    <span class="code-cd-img-open"></span></span><span class="code-cd-img-src"></span><span id="code-cd-' + i + '-img-src"></span><span class="code-cd-img-alt"></span><span id="code-cd-' + i + '-img-alt"></span><span class="code-cd-img-close"></span>')
        : $("#code-cd-" + i + "-img").text("");
      $(".code-cd-img-open").text('<img');
      $(".code-cd-img-src").text(' src="');
      $("#code-cd-" + i + "-img-src").text($("#cd-" + i + "-img-src").val() !== "" ? $("#cd-" + i + "-img-src").val() : "https:\/\/via.placeholder.com\/300");
      $(".code-cd-img-alt").text('"');
      $("#code-cd-" + i + "-img-alt").text($("#cd-" + i + "-img-alt").val() !== "" ? ' alt="' + $("#cd-" + i + "-img-alt").val() + '"' : "");
      $(".code-cd-img-close").text('>');
      preview("cd");
    });
    // toggle title code
    $(document).on('click', "#cd-" + i + "-check-title", function (event) {
      $("#cd-" + i + "-check-title").hasClass("checked")
        ? $("#code-cd-" + i + "-title").html('\n      <span class="code-cd-title-open"></span>\n        <span id="code-cd-' + i + '-title-text"></span>\n      <span class="code-cd-title-close"></span>')
        : $("#code-cd-" + i + "-title").text("");
      $(".code-cd-title-open").text('<h4 class="card-title">');
      $("#cd-" + i + "-title").val() !== "" ? $("#code-cd-" + i + "-title-text").text($("#cd-" + i + "-title").val()) : $("#code-cd-" + i + "-title-text").text("Card #" + i + " title");
      $(".code-cd-title-close").text('</h4>');
      preview("cd");
    });
    // update text
    updateText("cd", "#cd-" + i + "-img-src", "#code-cd-" + i + "-img-src", "https://via.placeholder.com/300");
    updateAltText("cd", "#cd-" + i + "-img-alt", "#code-cd-" + i + "-img-alt");
    updateText("cd", "#cd-" + i + "-title", "#code-cd-" + i + "-title-text", "Card #" + i + " title");
    updateText("cd", "#cd-" + i + "-text", "#code-cd-" + i + "-text", "Card #" + i + " text");
  }
}

function showCardImgs(cardCardLimit) {
  for (let i = 1; i <= cardCardLimit; i++) {
    $("#code-cd-" + i + "-img").html('\n    <span class="code-cd-img-open"></span><span class="code-cd-img-src"></span><span id="code-cd-' + i + '-img-src"></span><span class="code-cd-img-alt"></span><span id="code-cd-' + i + '-img-alt"></span><span class="code-cd-img-close"></span>');
    $(".code-cd-img-open").text('<img');
    $(".code-cd-img-src").text(' src="');
    $("#code-cd-" + i + "-img-src").text($("#cd-" + i + "-img-src").val() !== ""
    ? $("#cd-" + i + "-img-src").val() : "https:\/\/via.placeholder.com\/300");
    $(".code-cd-img-alt").text('"');
    $("#code-cd-" + i + "-img-alt").text($("#cd-" + i + "-img-alt").val() !== ""
      ? ' alt="' + $("#cd-" + i + "-img-alt").val() + '"'
      : "");
    $(".code-cd-img-close").text('>');
  }
}

/**********************************
 * Button Group                   *
 **********************************/

// on select change, show only the required no of cards to edit, update code and preview
$("#btngr-button-no").on('focus', function() {
  $(this).data("previous",$(this).val());
  $(this).blur();
  $("#btngr-button-no").change(function(){
    newMax = Number(($(this).val()));
    oldMax = Number(($(this).data("previous")));
    // compare old and new max list item value
    if (newMax > oldMax) {
      for (let i = oldMax; i < newMax; i++) {
        // add new items
        btncollapseCard = createbtncollapseCard(i+1);
        $("#code-buttongroup-buttons").append(btncollapseCard);
        colButton = createButtongroupEditorCard(i+1);
        $("#buttongroup-buttons").append(colButton);
      }
    } else {
      for (let i = newMax; i < oldMax; i++) {
        // remove items
        $("#code-buttongroup-button-"+(i+1)).remove();
        $("#col-button-"+(i+1)).remove();
      }
    }
    // reset previous value
    $(this).removeData("previous");
    preview("btngroup");
  });
});

// create all collapse editor cards and code on page load
function initialButtongroupbuttons(maxbtncollapseCards) {
  for (let i = 1; i <= maxbtncollapseCards; i++) {
    btncollapseCard = createbtncollapseCard(i);
    $("#code-buttongroup-buttons").append(btncollapseCard);
    colButton = createButtongroupEditorCard(i);
    $("#buttongroup-buttons").append(colButton);
  }
  preview("btngroup");
}
	
$("#btngroup-align").change(function() {
		$("#code-btngroup-align").text($(this).val());
		preview("btngroup");
});


// sets button style
$("#btngroup-style").change(function() {
 if ($(this).val() == "secondary") {
	for (let i = 1; i <= 10; i++) {
	//var buttoncolor = document.querySelector('#button-'+i+'-color-selector');
	$('#button-'+i+'-header-group').hide();
	$('#code-button-'+i+'-header').text("");
	$('#button-'+i+'-color-selector').show();
	$("#code-button-"+i+"-color").text("buttons border dkblue-under");
	$("#code-button-"+i+"-header-open").text(" ");
	$("#code-button-"+i+"-header-close").text(" ");
	$('#button-'+i+'-header').val("");
	preview("btngroup");
}
	} else {
	for (let i = 1; i <= 10; i++) {
	$('#button-'+i+'-header-group').show();
	$('#button-'+i+'-color-selector').hide();
	$("#code-button-"+i+"-color").text("buttons block-buttons blue-border");
	$("#code-button-"+i+"-header-open").text("<h3>");
	$("#code-button-"+i+"-header-close").text("</h3>");
	preview("btngroup");
	}
}});	
	


// create single button code
function createbtncollapseCard(i) {
return `
	<span id="code-buttongroup-button-${i}"><span class="code-open-tag">&lt;a</span>&#32;href="<span id="code-button-${i}-link">#</span>" class&#61;&#34;<span id="code-button-${i}-color">${ $("#btngroup-style").val() == "secondary" ? "buttons border dkblue-under" : "buttons block-buttons blue-border" }</span>&#34;&gt;</span>
  <span id="code-button-${i}-header-open">&lt;h3></span><span id="code-button-${i}-header"></span><span id="code-button-${i}-header-close">&lt;/h3></span><span id="code-button-${i}-text">Button Text</span>
<span class="code-close-tag">&lt;&#47;<span class="code-btn-tag">a</span>&gt;</span></span>
 </span>`;
}

// create single collapse editor card, shows first card and collapses all others
function createButtongroupEditorCard(i) {
  return `
	<div class="collapse-card ${ i == 1 ? "" : "collapsed" }" id="col-button-${i}">
	<div class="panel-heading">
		<a aria-expanded="false" href="#${i}" data-toggle="collapse" class="collapsed">
			<h4>Button #${i}</h4></a>
	</div>
	<div class="panel-collapse collapse" id="${i}" aria-expanded="false">
		<div class="panel-body">
		<form><div class="form-group" id="button-${i}-header-group" ${ $("#btngroup-style").val() == "secondary" ? `style="display:none"` : ""}> <label for="button-${i}-header">Button Header</label><input type="text" class="form-control" id="button-${i}-header" placeholder="Button #${i} header"></div>
          <div class="form-group">
            <label for="button-${i}-text">Button Text</label>
            <input type="text" class="form-control" id="button-${i}-text" placeholder="Button #${i} text">
          </div>
		  <div class="form-group">
            <label for="button-${i}-link">Button Link</label>
            <input type="text" class="form-control" id="button-${i}-link" placeholder="Button #${i} link">
			</div>
			<div class="form-group" id="button-${i}-color-selector" ${ $("#btngroup-style").val() == "standard" ? `style="display:none"` : ""}>
					<label class="input-group-text" for="button-${i}-color">Button color</label><br>
                  <select class="custom-select" id="button-${i}-color">
					<option value="border dkblue-under">Secondary - Dark Blue</option>
					<option value="border ltblue-under">Secondary - Light Blue</option>
					<option value="border orange-under">Secondary - Orange</option>
					<option value="border green-under">Secondary - Green</option>
					<option value="border yellow-under">Secondary - Yellow</option>
                  </select>
                </div>                 </div>
            </div>
        </form>
      </div>
    </div>
	</div>
  `;
}


// generate card text from input
updateButtongroupText(8);

function updateButtongroupText(btncollapseCardLimit) {
  for (let i = 1; i <= btncollapseCardLimit; i++) {
    updateText("btngroup", "#button-" + i + "-text", "#code-button-" + i + "-text", "");
    updateText("btngroup", "#button-" + i + "-header", "#code-button-" + i + "-header", "");
	updateText("btngroup", "#button-" + i + "-link", "#code-button-" + i + "-link", "#");
  preview("btngroup");
  $(document).on('click', "#button-" + i + "-color", function (event) {
     var buttonstyle = $(this).val();
	$("#code-button-"+i+"-color").text("buttons " + buttonstyle);
	preview("btngroup");
    });
  }
}

/**********************************
 * Panel Group                   *
 **********************************/

// on select change, show only the required no of cards to edit, update code and preview
$("#panel-no").on('focus', function() {
  $(this).data("previous",$(this).val());
  $(this).blur();
  $("#panel-no").change(function(){
    newMax = Number(($(this).val()));
    oldMax = Number(($(this).data("previous")));
    // compare old and new max list item value
    if (newMax > oldMax) {
      for (let i = oldMax; i < newMax; i++) {
        // add new items
		colPanel = createPanelgroupEditorCard(i+1);
        $("#panelgroup-panels").append(colPanel);
        panelCard = createpanelcollapseCard(i+1);
        $("#code-panelgroup-panels").append(panelCard);
		$(".code-panelgroup-row").text($("#panelgroup-row").val());
      }
    } else {
      for (let i = newMax; i < oldMax; i++) {
        // remove items
        $("#code-panelgroup-panel-"+(i+1)).remove();
        $("#col-panel-"+(i+1)).remove();
      }
    }
    // reset previous value
    $(this).removeData("previous");
    preview("panelgroup");
  });
});

// create all collapse editor cards and code on page load
function initialPanels(maxbtncollapseCards) {
  for (let i = 1; i <= maxbtncollapseCards; i++) {
    panelcollapseCard = createpanelcollapseCard(i);
    $("#code-panelgroup-panels").append(panelcollapseCard);
    colPanel = createPanelgroupEditorCard(i);
    $("#panelgroup-panels").append(colPanel);
  }
  preview("panelgroup");
}

// create single button code
function createpanelcollapseCard(i) {
return `
	<span id="code-panelgroup-panel-${i}"><span class="code-open-tag">&lt;div class="</span><span class="code-panelgroup-row">${$("#panelgroup-row").val()}</span><span class="code-close-tag">"&gt;</span><span class="code-open-tag">&lt;div class="panel-body"&gt;</span><span class="code-open-tag">&lt;a href="</span><span id="code-panelgroup-panel-${i}-link">#</span><span class="code-close-tag">"&gt;</span><span class="code-open-tag">&lt;img src="</span><span id="code-panelgroup-panel-${i}-image">https://fakeimg.pl/600x400?text=Replace+me</span><span class="code-open-tag">" alt="</span><span id="code-panelgroup-panel-${i}-alt">I require descriptive alt text</span><span class="code-close-tag">" data-themekey="#"&gt;</span><span class="code-open-tag">&lt;h3&gt;</span><span id="code-panelgroup-panel-${i}-title">Title Placeholder</span><span class="code-close-tag">&lt;/h3&gt;</span><span class="code-close-tag">&lt;/a&gt;</span><span class="code-open-tag">&lt;p&gt;</span><span id="code-panelgroup-panel-${i}-body"></span><span class="code-close-tag">&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;</span>`;
}

// create single collapse editor card, shows first card and collapses all others
function createPanelgroupEditorCard(i) {
  return `
	<div id="col-panel-${i}">
	<div class="panel-heading">
		<a aria-expanded="false" href="#col-panel-collapse-${i}" data-toggle="collapse" class="collapsed">
			<h4>Panel #${i}</h4></a>
	</div>
	<div class="panel-collapse collapse" id="col-panel-collapse-${i}" aria-expanded="false">
		<div class="panel-body">
		<form>
          <div class="form-group">
			<label for="panelgroup-panel-${i}-image">Image</label>
			<input type="text" class="form-control" id="panelgroup-panel-${i}-image" placeholder="Paste in the URL of your image">
		</div>
		<div class="form-group">
			<label for="panelgroup-panel-${i}-alt">Alt text</label>
			<input type="text" class="form-control" id="panelgroup-panel-${i}-alt" placeholder="Describe the image for a person with a visual impairment"</input>
		</div>
		<div class="form-group">
			<label for="panelgroup-panel-${i}-link">Link</label>
			<input type="text" class="form-control" id="panelgroup-panel-${i}-link" placeholder="Paste in the URL of the page you are linking to"</input>
		</div>
		<div class="form-group">
            <label for="panelgroup-panel-${i}-title">Title</label>
            <input type="text" class="form-control" id="panelgroup-panel-${i}-title" placeholder="Panel ${i} title">
          </div>
		  <div class="form-group">
            <label for="panelgroup-panel-${i}-body">Body</label>
            <input type="text" class="form-control" id="panelgroup-panel-${i}-body" placeholder="Panel ${i} body">
          </div>
        </form>
      </div>
    </div>
	</div>
  `;
}

$("#panelgroup-row").change(function() {
		$(".code-panelgroup-row").text($(this).val());
		preview("panelgroup");
});

$("#panelgroup-image").change(function() {
		$("#code-panelgroup-image").text($(this).val());
		preview("panelgroup");
});


// generate card text from input
updatePanelgroupText();

function updatePanelgroupText() {
  for (let i = 1; i <= 12; i++) {
    updateText("panelgroup", "#panelgroup-panel-" + i + "-image", "#code-panelgroup-panel-" + i + "-image", "#");
    updateText("panelgroup", "#panelgroup-panel-" + i + "-alt", "#code-panelgroup-panel-" + i + "-alt", "I require descriptive alt text");
	updateText("panelgroup", "#panelgroup-panel-" + i + "-title", "#code-panelgroup-panel-" + i + "-title", "Title Placeholder");
	updateText("panelgroup", "#panelgroup-panel-" + i + "-link", "#code-panelgroup-panel-" + i + "-link", "#");
	updateText("panelgroup", "#panelgroup-panel-" + i + "-body", "#code-panelgroup-panel-" + i + "-body", "");
  preview("panelgroup");
  }
}



/**********************************
 * collapse                       *
 **********************************/

// on selet change, show only the required no of cards to edit, update code and preview
$("#col-card-no").on('focus', function() {
  $(this).data("previous",$(this).val());
  $(this).blur();
  $("#col-card-no").change(function(){
    newMax = Number(($(this).val()));
    oldMax = Number(($(this).data("previous")));
    // compare old and new max list item value
    if (newMax > oldMax) {
      for (let i = oldMax; i < newMax; i++) {
        // add new items
        collapseCard = createCollapseCard(i+1);
        $("#code-col-cards").append(collapseCard);
        colCard = createCollapseEditorCard(i+1);
        $("#collapse-cards").append(colCard);
      }
    } else {
      for (let i = newMax; i < oldMax; i++) {
        // remove items
        $("#code-col-card-"+(i+1)).remove();
        $("#col-card-"+(i+1)).remove();
      }
    }
    // reset previous value
    $(this).removeData("previous");
    preview("col");
  });
});

// create all collapse editor cards and code on page load
function initialCollapseCards(maxCollapseCards) {
  for (let i = 1; i <= maxCollapseCards; i++) {
    collapseCard = createCollapseCard(i);
    $("#code-col-cards").append(collapseCard);
    colCard = createCollapseEditorCard(i);
    $("#collapse-cards").append(colCard);
  }
  preview("col");
}

// create single collapse card code, shows first card and collapses all others
function createCollapseCard(i) {
  return `<span id="code-col-card-${i}"><span class="code-open-tag">&lt;div&#32;class&#61;&#34;panel-heading&#34;&gt;</span>
    <span class="code-open-tag">&lt;a aria-expanded="false" href="#collapse-${i}" data-toggle="collapse" class="collapsed"&gt;&lt;h4&gt;</span>
      <span id="code-col-collapse-${i}-heading">Collapse card #${i} heading</span><span class="code-close-tag">&lt;/h4&gt;&lt;/a&gt;</span>
      <span class="code-close-tag">&lt;&#47;div&gt;</span>
    <span class="code-open-tag">&lt;div&#32;class&#61;&#34;panel-collapse collapse&#34; id="collapse-${i}" aria-expanded="false"&gt;&lt;div class="panel-body"&gt;</span>
      <span id="code-col-collapse-${i}-body">Collapse card #${i} body</span>
    <span class="code-close-tag">&lt;&#47;div&gt;</span>
  <span class="code-close-tag">&lt;&#47;div&gt;</span></span>`;
}

// create single collapse editor card, shows first card and collapses all others
function createCollapseEditorCard(i) {
  return `
    <div class="panel-heading">
		<a aria-expanded="false" href="#col-card-${i}" data-toggle="collapse" class="collapsed">
			<h4>Card #${i}</h4>
		</a>
	</div>
	<div class="panel-collapse collapse" id="col-card-${i}" aria-expanded="false">
		<div class="panel-body">
        <form>
          <div class="form-group">
            <label for="collapse-${i}-heading">Heading</label>
            <input type="text" class="form-control" id="collapse-${i}-heading" placeholder="Collapse card #${i} heading">
          </div>
          <div class="form-group">
            <label for="collapse-${i}-body">Body</label>
            <textarea class="form-control" id="collapse-${i}-body" placeholder="Collapse card #${i} body" rows="6"></textarea>
          </div>
        </form>
      </div>
    </div>
  `;
}

// generate card text from input
updateCollapseText(8);

function updateCollapseText(collapseCardLimit) {
  for (let i = 1; i <= collapseCardLimit; i++) {
    updateText("col", "#collapse-" + i + "-heading", "#code-col-collapse-" + i + "-heading", "Collapse card #" + i + "heading");
    updateText("col", "#collapse-" + i + "-body", "#code-col-collapse-" + i + "-body", "Collapse card #" + i + "body");
	preview("btngroup");
  }
}



/**********************************
 * list                           *
 **********************************/

// on select change, show only the required no of list items to edit, update code and preview
$("#ls-item-no").on('focus', function() {
  $(this).data("previous",$(this).val());
  $(this).blur();
  $("#ls-item-no").change(function(data){
    newMax = Number(($(this).val()));
    oldMax = Number(($(this).data("previous")));
    // compare old and new max list item value
    if (newMax > oldMax) {
      for (let i = oldMax; i < newMax; i++) {
        // add new items
        listItem = createListItem(i+1);
        $("#code-ls-items").append(listItem);
        card = createListItemEditorCard(i+1);
        $("#ls-items").append(card);
      }
    } else {
      for (let i = newMax; i < oldMax; i++) {
        // remove items
        $("#code-ls-item-"+(i+1)).remove();
        $("#ls-item-"+(i+1)+"-card").remove();
      }
    }
    // reset previous value
    $(this).removeData("previous");
    preview("ls");
  });
});

// change list type
$("#ls-type").change(function(data){
  type = $(this).val();
  $(".code-ls-tag").text(type);
  preview("ls");
});

// create all list item editor cards and code on page load
function initialListItems(maxListItems) {
  for (let i = 1; i <= maxListItems; i++) {
    listItem = createListItem(i);
    $("#code-ls-items").append(listItem);
    lsCard = createListItemEditorCard(i);
    $("#ls-items").append(lsCard);
  }
  preview("ls");
}

// create single list item code, shows first card and collapses all others
function createListItem(i) {
  return `${ i == 1 ? "" : "  "}<span class="code-ls-item" id="code-ls-item-${i}"><span class="code-open-tag">\n  &lt;li&gt;</span>
    <span id="code-ls-item-${i}-text">${ !$("#ls-item-" + i + "-text").val() == "" ? $("#ls-item-" + i + "-text").val() : "List item #" + i + " text"}</span>
  <span class="code-close-tag">&lt;&#47;li&gt;</span></span>`;
}

// create single card editor card, shows first card and collapses all others
function createListItemEditorCard(i) {
  return `
<div class="input-group mb-3" id="ls-item-${i}-card">
  <div class="input-group-prepend">
    <span class="input-group-text">${i}</span>
  </div>
  <input type="text" class="form-control" id="ls-item-${i}-text" aria-label="List item text">
</div>`;
}

/*
${ i == maxListItems ? "" : "\n"}
<div class="row">
  <div class="col-md-9">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">${i}</span>
      </div>
      <input type="text" class="form-control" id="ls-item-${i}-text" aria-label="List item text">
    </div>
  </div>
  <div class="col-md-3">
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="ls-item-${i}-check-sublist">
      <label class="custom-control-label" for="ls-item-${i}-check-sublist">Sublist</label>
    </div>
  </div>
</div>`;
*/

// generate card text from input
updateListItems(8);

updateTextOrHide("ls", "#ls-custom-class", "&#32;class&#61;&#34", "#code-ls-custom-class", "&#34;" );

function updateListItems(listItemLimit) {
  for (let i = 1; i <= listItemLimit; i++) {
//    toggleCheckbox("ls", "#ls-item-${i}-check-sublist", "#ls-item-${i}-sublist-form");
    updateText("ls", "#ls-item-" + i + "-text", "#code-ls-item-" + i + "-text", "List item #" + i + " text");
  }
}

/**********************************
 * quotation                      *
 **********************************/

updateText("quo", "#quo-body", "#code-quo-body", "Quotation");
updateText("quo", "#quo-att", "#code-quo-att", "Attribution (2019)");

/**********************************
 * table                          *
 **********************************/

// on column selet change, update table code and preview
$("#tab-col-no").on('focus', function() {
  $(this).data("previous",$(this).val());
  $(this).blur();
  $("#tab-col-no").change(function(){
    newMax = Number(($(this).val()));
    oldMax = Number(($(this).data("previous")));
    maxTabRows = $("#tab-row-no").val();
    // compare old and new max list item value
    if (newMax > oldMax) {
      for (let c = oldMax; c < newMax; c++) {
        // add new headers
        if ($("#tab-check-column-header").hasClass("checked")) {
          tabColHeader = createTableColHeader(c+1);
          $("#code-tab-headers").append(tabColHeader);
        }
        for (let r = 1; r <= maxTabRows; r++) {
          tabRowCol = createTableRowCol(c+1,r);
          $("#code-tab-row-"+ r + "-cols").append(tabRowCol);
        }
      }
     } else {
       for (let c = newMax; c < oldMax; c++) {
        // remove items
        $("#code-tab-col-"+(c+1)+"-header").remove();
        for (let r = 1; r <= maxTabRows; r++) {
          $("#code-tab-row-"+r+"-col-"+(c+1)).remove();
        }
      }
    }
    // reset previous value
    $(this).removeData("previous");
    preview("tab");
  });
});

// on row selet change, update table code and preview
$("#tab-row-no").on('focus', function() {
  $(this).data("previous",$(this).val());
  $(this).blur();
  $("#tab-row-no").change(function(){
    newMax = Number(($(this).val()));
    oldMax = Number(($(this).data("previous")));
    // compare old and new max list item value
    if (newMax > oldMax) {
      for (let r = oldMax; r < newMax; r++) {
        // add new items
        tabRow = createTableRow(r+1);
        $("#code-tab-rows").append(tabRow);
        maxTabCols = $("#tab-col-no").val();
        for (let c = 1; c <= maxTabCols; c++) {
          tabRowCol = createTableRowCol(c,r+1);
          $("#code-tab-row-"+ (r+1) + "-cols").append(tabRowCol);
        }
        if ($("#tab-check-row-header").hasClass("checked")) {
          tabRowHeader = createTableRowHeader(r + 1);
          $("#code-tab-row-" + (r + 1) + "-header").append(tabRowHeader);
        }
      }
    } else {
      for (let r = newMax; r < oldMax; r++) {
        // remove items
        $("#code-tab-row-"+(r+1)).remove();
      }
    }
    // reset previous value
    $(this).removeData("previous");
    preview("tab");
  });
});

// initial table size
function initialTable(maxTabCols, maxTabRows) {
  for (let c = 1; c <= maxTabCols; c++) {
    tabColHeader = createTableColHeader(c);
    $("#code-tab-headers").append(tabColHeader);
  }
  for (let r = 1; r <= maxTabRows; r++) {
    tabRow = createTableRow(r);
    $("#code-tab-rows").append(tabRow);
    for (let c = 1; c <= maxTabCols; c++) {
      tabRowCol = createTableRowCol(c,r);
      $("#code-tab-row-"+ r + "-cols").append(tabRowCol);
    }
  }
  preview("tab");
}

// create single table column header code
function createTableColHeader(i) {
  return `<span id="code-tab-col-${i}-header">\n        <span class="code-open-tag">&lt;th&#32;scope&#61;&#34;col&#34;&gt;<span id="code-tab-col-${i}-header-text">Column header</span><span class="code-close-tag">&lt;&#47;th&gt;</span></span>`;
}
// create single table row header code
function createTableRowHeader(i) {
  return `<span class="code-tab-row-header">\n        <span class="code-open-tag">&lt;th&#32;scope&#61;&#34;row&#34;&gt;<span id="code-tab-row-${i}-header-text">${i == 0 ? "#" :"Row Header"}</span><span class="code-close-tag">&lt;&#47;th&gt;</span></span>`;
}
// create single table row code
function createTableRow(i) {
  return `<span id="code-tab-row-${i}">\n      <span class="code-open-tag">&lt;tr&gt;<span id="code-tab-row-${i}-cols"><span id="code-tab-row-${i}-header"></span></span>
      <span class="code-close-tag">&lt;&#47;tr&gt;</span></span>`;
}
// create single table row column code
function createTableRowCol(i,j) {
  return `<span id="code-tab-row-${j}-col-${i}">\n        <span class="code-open-tag">&lt;td&gt;<span id="code-tab-row-${j}-col-${i}-text">Cell</span><span class="code-close-tag">&lt;&#47;td&gt;</span></span>`;
}

// change table width
$("#tab-width").change(function() {
  $("#code-tab-width").text( $(this).val() == "default" ? " default-width" : "" );
  preview("tab");
});

// change vertical text alignment
$("#vertical-align").change(function() {
  $("#code-tab-vertical-align").text( $(this).val() == "middle" ? " vertical-align-middle" : "" );
  preview("tab");
});

// toggle table column headers
toggleCheckboxText("#tab-check-column-header", "#tab-toggle-column-header");
$(document).on("click", "#tab-check-column-header", function(event) {
  $(this).toggleClass("unchecked").toggleClass("checked");
  maxTabCols = $("#tab-col-no").val();
  $(this).hasClass("checked")
    ? ($("#code-tab-thead-open-tag").text('\n    <thead>\n      <tr>'),
       $("#code-tab-thead-close-tag").text('\n      </tr>\n    </thead>'))
    : $("#code-tab-thead-open-tag, #code-tab-thead-close-tag, #code-tab-row-0-header, #code-tab-headers").empty();
  if ($(this).hasClass("checked")) {
    for (let c = 1; c <= maxTabCols; c++) {
      tabColHeader = createTableColHeader(c);
      $("#code-tab-headers").append(tabColHeader);
    }
    if ($("#tab-check-row-header").hasClass("checked")) {
      tabRowHeader = createTableRowHeader(0);
      $("#code-tab-row-0-header").append(tabRowHeader);
    }
  }
  preview("tab");
});

// toggle table row headers
toggleCheckboxText("#tab-check-row-header", "#tab-toggle-row-header");
$(document).on("click", "#tab-check-row-header", function(event) {
  $(this).toggleClass("unchecked").toggleClass("checked");
  maxTabRows = $("#tab-row-no").val();
  if ($(this).hasClass("checked") && $("#tab-check-column-header").hasClass("checked")) {
    for (let r = 0; r <= maxTabRows; r++) {
      tabRowHeader = createTableRowHeader(r);
      $("#code-tab-row-" + r + "-header").append(tabRowHeader);
    }
  } else if ($(this).hasClass("checked") && $("#tab-check-column-header").hasClass("unchecked")) {
    for (let r = 1; r <= maxTabRows; r++) {
      tabRowHeader = createTableRowHeader(r);
      $("#code-tab-row-" + r + "-header").append(tabRowHeader);
    }
  } else {
    $(".code-tab-row-header").remove();
  }
  preview("tab");
});


/**********************************
 * transcript                     *
 **********************************/

$("#ts-type").change(function() {
  // if secondary style is selected, force button standard button size
  $(this).val() == "nsp"
    ? (
        $("#ts-id-container").html('<div class="input-group-prepend">\n<label class="input-group-text" for="ts-id">Unique ID*</label>\n</div><input type="text" class="form-control" id="ts-id" aria-label="ts-id" placeholder="modname-unitno-transcript-no" required>\n<div class="invalid-feedback" id="ts-id-invalid-feedback">Please enter the id link.</div>'),
        $(".code-ts-btn-tag").text("button"),
        $("#code-ts-view-btn-class").text(" btn-secondary collapsed"),
        $("#code-ts-view-btn-role, #code-ts-download-btn-class").empty(),
        $("#code-ts-id-1").text(' data-toggle="collapse" data-target="#'),
        $(".code-ts-id").text($("#ts-id").val() === "" ? "modname-unitno-transcript-no" : $("#ts-id").val()),
        $("#code-ts-id-2").text('" aria-expanded="false" aria-controls="'),
        $("#code-ts-card-collapse").text(" collapse"),
        $("#code-ts-id-3").text('"'),
        $("#code-ts-id-4").text(' id="'),
        $("#code-ts-id-5").text('"')
      )
    : (
        $("#ts-id-container").empty(),
        $(".code-ts-btn-tag").text("a"),
        $("#code-ts-view-btn-class").text(" btn-primary view-close-transcript"),
        $("#code-ts-view-btn-role").text(' role="button"'),
        $("#code-ts-download-btn-class").text(" download-transcript"),
        $(".code-ts-id, #code-ts-id-1, #code-ts-id-2, #code-ts-id-3, #code-ts-id-4, #code-ts-id-5, #code-ts-card-collapse").empty()
     );
  preview("ts");
});

updateText("ts", "#ts-id", ".code-ts-id", "modname-unitno-transcript-no");
//updateText("ts", "#ts-body", "#code-ts-body", "foo");
//updateText("ts", "#ts-link", "#code-ts-link", "#");
updateText("ts", "#ts-body", "#code-ts-body-text", "Transcript body...");

/*
// toggle view close transcript button
$(document).on("click", ".view-close-transcript", function(event) {
  $(this).text($(this).text() == 'View transcript' ? 'Close transcript' : 'View transcript');
});
*/
/**********************************
 * video                          *
 **********************************/

// change responsive ratio on size select
$("#vd-player-size").change(function() {
  $("#code-vd-player-size").text($(this).val());
  if (!$("#vd-embed").val() == "") preview("vd");
});

// change class on media type select
$("#vd-media-type").change(function() {
  $(this).val() == "kaltura" ? $("#vd-player-size-form").show() : $("#vd-player-size-form").hide();
  $("#code-vd-player-size").text( $(this).val() == "kaltura" ? $("#vd-player-size").val() : $("#vd-media-type").val() );
  embedText = $("#vd-embed").val();
  embedTextAddVariables();
  if (!embedText == "") preview("vd");
});

// generate embed code
$("#vd-embed").keyup(function() {
  embedText = $("#vd-embed").val();
  $("#vd-media-type").val() !== "youtube"
  ? embedTextAddVariables()
  : $("#code-vd-embed").text(embedText);
  preview("vd");
}).keyup();

function embedTextAddVariables() {
  $("#vd-media-type").val() == "kaltura-playlist"
  ? variables = '&amp;flashvars[playlistAPI.containerPosition]=bottom&amp;flashvars[infoScreen.plugin]=false&amp;flashvars[titleLabel.plugin]=false&amp;flashvars[related.plugin]=false&amp;flashvars[closedCaptions.displayCaptions]=false&amp;flashvars[closedCaptions.layout]=below&amp;flashvars[transcript.plugin]=false&amp;flashvars[IframeCustomPluginCss1]=https:\/\/git.iddkingsonline.com\/designsystem\/css\/kaltura.css'
  : variables = '&amp;flashvars[infoScreen.plugin]=false&amp;flashvars[titleLabel.plugin]=false&amp;flashvars[related.plugin]=false&amp;flashvars[closedCaptions.displayCaptions]=false&amp;flashvars[closedCaptions.layout]=below&amp;flashvars[transcript.plugin]=false&amp;flashvars[IframeCustomPluginCss1]=https:\/\/git.iddkingsonline.com\/designsystem\/css\/kaltura.css';
  // add variables
  (!embedText == "")
  ? ( embedText = embedText.replace('\" width', variables + '\" width'),
    $("#code-vd-embed").text(embedText))
  : $("#code-vd-embed").text("<iframe></iframe>");
}

/**********************************
 * view answer                    *
 **********************************/

// sets type
$("#va-type").change(function() {
  $(".code-va-type").text($(this).val());
  // removes hyphen from model answer button text
  $("#code-va-type-button-text").text( $(this).val() == "generic" ? "" : ' ' + $(this).val().replace('-',' ') );
  preview("va");
});

// toggle view answer author code
toggleCheckboxText("#va-check-author", "#va-toggle-author");
$(document).on("click", "#va-check-author", function(event) {
  $("#va-check-author").toggleClass("unchecked").toggleClass("checked");
  $(".va-author").toggle();
  $("#code-va-author").html( $(this).hasClass("checked") ? '<span class="code-va-author-open"></span><span id="code-va-author-img-src"></span><span class="code-va-author-2"></span><span id="code-va-author-img-alt"></span><span class="code-va-author-3"></span><span id="code-va-author-name"></span><span class="code-va-author-close"></span>' : "");
  $(".code-va-author-open").text('<div class="card-author">\n        <img src="');
  $("#code-va-author-img-src").text( $("#va-author-img-src").val() !== "" ? $("#va-author-img-src").val() : "https://via.placeholder.com/150");
  $(".code-va-author-2").text('"');
  $("#code-va-author-img-alt").text( $("#va-author-img-alt").val() !== ""
    ? ' alt="' + $("#va-author-img-alt").val() + '"'
    : "");
  $(".code-va-author-3").text('>\n        <h5 class="card-title">');
  $("#code-va-author-name").text( $("#va-author-name").val() !== "" ? $("#va-author-name").val() : "Author name");
  $(".code-va-author-close").text('</h5>\n      </div>\n      ');
  preview("va");
});

// updates text on input change
updateText("va", "#va-author-img-src", "#code-va-author-img-src", "https://keats.kcl.ac.uk/pluginfile.php/1234567/mod_folder_content/1/23/name.jpg");
updateAltText("va", "#va-author-img-alt", "#code-va-author-img-alt");
updateText("va", "#va-author-name", "#code-va-author-name", "Author name");
updateText("va", "#va-q", "#code-va-q", "Lemon drops gingerbread topping?");
updateText("va", "#va-a", "#code-va-a", "Pudding pie bonbon muffin carrot cake fruitcake macaroon...");

/**********************************
 * test                           *
 **********************************/

$("#test-type").change(function() {
  // if secondary style is selected, force button standard button size
  $(this).val() == "nsp"
    ? (
        $("#test-id-container").html('<div class="input-group-prepend">\n<label class="input-group-text" for="test-id">Unique ID*</label>\n</div><input type="text" class="form-control" id="test-id" aria-label="test-id" placeholder="modname-unitno-transcript-no" required>\n<div class="invalid-feedback" id="test-id-invalid-feedback">Please enter the id link.</div>'),
        $(".code-test-btn-tag").text("button"),
        $("#code-test-view-btn-class").text(" btn-secondary collapsed"),
        $("#code-test-view-btn-role, #code-test-download-btn-class").empty(),
        $("#code-test-id-1").text(' data-toggle="collapse" data-target="#'),
        $(".code-test-id").text($("#test-id").val() === "" ? "modname-unitno-transcript-no" : $("#test-id").val()),
        $("#code-test-id-2").text('" aria-expanded="false" aria-controls="'),
        $("#code-test-card-collapse").text(" collapse"),
        $("#code-test-id-3").text('"'),
        $("#code-test-id-4").text(' id="'),
        $("#code-test-id-5").text('"')
      )
    : (
        $("#test-id-container").empty(),
        $(".code-test-btn-tag").text("a"),
        $("#code-test-view-btn-class").text(" btn-primary view-close-transcript"),
        $("#code-test-view-btn-role").text(' role="button"'),
        $("#code-test-download-btn-class").text(" download-transcript"),
        $(".code-test-id, #code-test-id-1, #code-test-id-2, #code-test-id-3, #code-test-id-4, #code-test-id-5, #code-test-card-collapse").empty()
     );
  preview("test");
  console.log($("#test-body").val());
});

updateText("test", "#test-id", ".code-test-id", "modname-unitno-transcript-no");
updateText("test", "#test-link", "#code-test-link", "#");
updateText("test", "#test-body", "#code-test-body", "Transcript body...");

// toggle view close transcript button
$(document).on("click", ".view-close-transcript", function(event) {
  $(this).text($(this).text() == 'View transcript' ? 'Close transcript' : 'View transcript');
});

/**********************************
 * general functions              *
 **********************************/

// disable preview button
function disablePreview() {
  $(".preview-pane").children().click(function (e) {
    e.preventDefault();
  });
};

// update text from input, allows elements added to the DOM after page load to be identified
function updateText(component, input, outputText, defaultText) {
  $(document).on('keyup', input, function (event) {
    (!$(this).val() == "") ? $(outputText).text($(this).val()) : $(outputText).text(defaultText);
    preview(component);
  }).keyup();
}

// update img alt text from input, allows elements added to the DOM after page load to be identified
function updateAltText(component, input, outputText) {
  $(document).on('keyup', input, function (event) {
    (!$(this).val() == "") ? $(outputText).text(' alt="' + $(this).val() + '"') : $(outputText).text("");
    preview(component);
  }).keyup();
}

// update text from input, or hide container if empty
function updateTextOrHide(component, input, open, output, close) {
  $(document).on('keyup', input, function (event) {
    (!$(this).val() == "") ?  $(output).html(open + $(this).val() + close) : $(output).empty();
    preview(component);
  }).keyup();
}

// toggles display of option field upon checkbox click
function toggleCheckbox(component, input, target) {
  $(document).on('click', input, function (event) {
    $(target).toggle(this.checked);
    $(input).toggleClass("unchecked").toggleClass("checked");
    preview(component);
  });
}

// toggles checkbox text
function toggleCheckboxText(input, textspan) {
  $(document).on('click', input, function (event) {
    $(textspan).text($(input).hasClass("checked") ? "Add" : "Remove");
  });
}

// generate preview
function preview(component) {
  text = $("#" + component + "-print-code").text();
  $("#" + component + "-preview-pane").html(text);
  // disable preview for buttons so users don't click away from the page
 // if (component == "btn") disablePreview();
}

copyCode("btngroup");
copyCode("panelgroup");
copyCode("brcr");
copyCode("an");
copyCode("au");
copyCode("btn");
copyCode("cd");
copyCode("crsl");
copyCode("col");
copyCode("dl");
copyCode("geshi");
copyCode("ib");
copyCode("ls");
copyCode("quo");
copyCode("tab");
copyCode("tl");
copyCode("ts");
copyCode("va");
copyCode("vd");
copyCode("test");

// on copy code button click
function copyCode(component) {
  $(document).on("click", "#copy-" + component + "-code", function(event) {
    // run component validation
    componentForms = [$("#" + component + "-form")];
    validity = "valid";
    altTextValidity = "valid";
    // for carousel, check alt text
    if (component == "crsl" && $("#crsl-check-img").hasClass("checked")) {
      altTextForms = [];
      $(".crsl-slide-form").each(function() {
        altTextForms.push($(this));
      });
      validateForms(altTextForms);
      altTextValidity == "invalid" ? $("#crsl-alt-text-alert").removeClass("d-none") : $("#crsl-alt-text-alert").addClass("d-none");            
    }
    validateForms(componentForms);
    if (validity === "invalid") return;
    // copy code onto clipboard
    str = $("#" + component + "-preview-pane").html();
    function listener(event) {
      event.clipboardData.setData("text/html", str);
      event.clipboardData.setData("text/plain", str);
      event.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    alert("Your code has been copied to the clipboard \uD83D\uDE00");
  })
}

function validateForms(forms) {
  $.each(forms, function(i, form) {
    if (form.hasClass("needs-validation")) {
      form.addClass("was-validated");
      if (!form[0].checkValidity()) {
        validity = "invalid";
        if (altTextForms && forms == altTextForms) altTextValidity = "invalid";
      }
    }
  });
}
