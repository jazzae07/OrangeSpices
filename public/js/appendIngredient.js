$(document).ready(function(){ 
  var ingArray = [];

  function addIng(id, qty, unit) {
    ingArray.push({id: id, qty: Number.parseInt(qty), unit: unit});
  }
    
  var i = 1;  
  var idIngList = [], ingName = [], qtyList = [], unitList = [];
  var prod, category, price;

  $('#addIngredient').click(function(){  
    console.log("adding...");
    var selectIng = document.getElementById("selectIng");
    var selectedValue = selectIng.options[selectIng.selectedIndex].value;
    var selectedVal = selectIng.options[selectIng.selectedIndex].getAttribute("data-id");
    var qty = document.getElementById("quantity").value;
    var unitName = document.getElementById("unit").value;
    var unit = document.getElementById("unit");
    var unitID = unit.options[unit.selectedIndex].getAttribute("data-id");

    if(qty == ""){
      alert("Please fill out all fields!");
    }
    else if(qty < 0){
        alert("You cannot enter a negative value!");
    }
    else{
      idIngList.push(selectedVal);
      ingName.push(selectedValue);
      qtyList.push(qty);
      unitList.push(unitID);

      addIng(selectedVal, qty, unit);
      i++;  

      $('#dynamic_field').append('<tr id="row'+i+'"><td><input disabled="disabled" class="form-control" id="selectIng" name="ingredientName" placeholder="' + selectedValue +'" style="width:215px;"></input></td><td><input type="number" class="form-control" disabled="disabled" style="width:120px; height: 40px; margin-right: 20px; margin-left: 20px;" id="quantity" placeholder="' + qty +'"min="1"></td><td><input id="unit" class="form-control" disabled="disabled" placeholder="' + unitName +'" style="width:150px; height: 40px;"></input></td><td><button style="margin-left: 25px; height: 40px;" type="button" name="remove" id="'+i+'" class="btn btn-danger btn_remove">x Remove</button></td></tr>');  
    }
  }); 

  $(document).on('click', '.btn_remove', function(){  
    var button_id = $(this).attr("id");
    var index = button_id - 2; 
    console.log("removing..." + button_id);  
    $('#row'+button_id+'').remove();  
    idIngList.splice(index, 1);
    ingName.splice(index, 1);
    qtyList.splice(index, 1);
    unitList.splice(index, 1); 
  });  

  $("button.save-btn").click(function(){
    prod = document.getElementById("product").value;
    category = document.getElementById("category").value;
    price = document.getElementById("prodPrice").value;

    if(prod == "" || category == "" || price == "" ){
      alert("Please fill out all fields!");
    }
    else if(price <= 0){
        alert("You cannot enter a zero or negative value!");
    }
    else{
      $.ajax({
        url: '/products/add',
        method: 'POST',
        data: {
          prodName: prod,
          category: category,
          prodPrice: price,
          idIngList: idIngList,
          ingName: ingName,
          qtyList: qtyList,
          unitList: unitList
        },
        error: function(){
          alert("Please fill out the ingrdients table.");
        },
        success: function(){
          window.location.href="/products"; 
      }
      });
      alert("Product successfully saved!");
    }
  });
}); 