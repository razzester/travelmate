<<<<<<< HEAD
// ***************************** ADMIN SECTION *****************************************************************************



/*function remove_branch($branchID){
	alert($branchID);

	$.ajax({

                type: "POST",
                 url: "controller/branch_remove.php",
                 async: false,
                 data: {branchID:$branchID},
                 success : function(text)
                 {
                     status = text;
                     alert(status);
                 }
      });
	
}
*/

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue ;
}

var branchID;
function remove_branch($branchID){
	swal({
		title: "Are you sure?",
		text: "Once deleted, you will not be able to recover this information!",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			$.ajax({

                type: "POST",
                 url: "controller/branch_remove.php",
                 async: false,
                 data: {branchID:$branchID},
                 success : function(text)
                 {
                     status = text;
                     swal("This branch has been deleted!", {
						icon: "success",
					 });
					 location.reload();

                 }
      });


			
		} 
	});

	
}

function edit_branch($branchID,$branchName,$branchAddress,$contact){

	document.getElementById("edit_branch_area").style.display="block";
	document.getElementById("branch_name").value=$branchName;
	document.getElementById("branch_address").value=$branchAddress;
	document.getElementById("branch_contact").value=$contact;	
	branchID=$branchID;
}

function update_branch(){
	
	var new_name=document.getElementById("branch_name").value;
	var new_address=document.getElementById("branch_address").value;
	var new_contact=document.getElementById("branch_contact").value;
	$.ajax({

                type: "POST",
                 url: "controller/branch_update.php",
                 async: false,
                 data: {branchID:branchID,name:new_name,address:new_address,contact:new_contact},
                 success : function(text)
                 {
                     status = text;
                     
                 }
      });

	alert(status);
	location.reload();

	


}

function register_branch(){
	var name=document.getElementById("input_branch_name").value;
	var address=document.getElementById("input_branch_address").value;
	var contact=document.getElementById("input_branch_contact").value;
	alert(name+address+contact);
	$.ajax({

                type: "POST",
                 url: "controller/branch_add.php",
                 async: false,
                 data: {name:name,address:address,contact:contact},
                 success : function(text)
                 {
                     status = text;
                     
                 }
      });

	alert(status);
	windows.location.replace('branch_manage.php');

}

function authenticate_admin(){
    var username=document.getElementById('admin_username_in').value;
    var password=document.getElementById('admin_password_in').value;
    var authenticated=false;
    $.ajax({

        type: "POST",
         url: "./controller/admin_authenticate.php",
         async: false,
         data: {admin_username_in:username,admin_password_in:password},
         success : function(response)
         {
             if(response){
                 
                 var arr=JSON.parse(response);
                 setCookie('username',arr[0]);
                 var branch=arr.slice(1);
                 
                 setCookie('branch',branch);
                 setCookie('branch_selected',branch[0]);
                 authenticated = true;
             }
             else
             {
                 alert("Username or Password incorrect");
             }
             
         }
});
if(authenticated){
    
    location.replace("admin.php");
    
}

}

function remove_staff($staffID){
	swal({
		title: "Are you sure?",
		text: "Once deleted, you will not be able to recover this information!",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			$.ajax({

                type: "POST",
                 url: "controller/staff_remove.php",
                 async: false,
                 data: {staffID:$staffID},
                 success : function(text)
                 {
                     status = text;
                     swal("This staff has been deleted!", {
						icon: "success",
					 });
					 location.reload();

                 }
      });


			
		} 
	});

	
}


function add_currency(){
	var name=document.getElementById("input_currency_name").value;
	var amount=document.getElementById("input_currency_amount").value;
    var image=document.getElementById("input_currency_image").files[0].name;
    alert(image);
    	
	$.ajax({

                type: "POST",
                 url: "controller/inventory_add.php",
                 async: false,
                 data: {name:name,amount:amount,image:image},
                 success : function(text)
                 {
                     status = text;
                     alert(status);
                     
                 }
      });

}






//***************************************This is Staff Section************************************************************************

function authenticate_staff(){
    var username=document.getElementById('staff_username_in').value;
    var password=document.getElementById('staff_password_in').value;
    var branch=document.getElementById('staff_branch_in').value;
    var authenticated=false;
    $.ajax({

        type: "POST",
         url: "./controller/staff_authenticate.php",
         async: false,
         data: {username:username,password:password,branch:branch},
         success : function(response)
         {
             if(response){
                 alert(response);
                 
                 authenticated = true;
             }
             else
             {
                 alert("Username, Password or Branch incorrect");
             }
             
         }
});
if(authenticated){
    
    location.replace("staff.php");
    
}
}


function check_currency_balance($currency){
    $id=document.getElementById('currency_selector').value;
    setCookie('currency_name',$currency);
    //alert($curr);
    $.ajax({

        type: "POST",
         url: "./controller/check_currency_balance.php",
         async: false,
         data: {id:$id},
         success : function(response)
         {
             if(response){
                alert(response);
                console.log(response);
                 //setCookie('total',response);
                 document.getElementById("max_transfer_amount").innerHTML="maximum transferable amount = "+ response;
                 document.getElementById("transfer_amount_in").setAttribute("max",response);
                 document.getElementById("max_transfer_amount").style.color="green";
                 
                 
            }
            else{
                console.log("no any response");
            }
        }
    }); 
}



// function get_currency_details($currency){
//     $id=document.getElementById('currency_selector').value;
//     setCookie('currency_name',$currency);
//     //alert($curr);
//     $.ajax({

//         type: "GET",
//          url: "./controller/get_currency_details.php",
         
//          success : function(response)
//          {
//              if(response){
//                 alert(response);
//                 var currency=JSON.parse(response);
//                 var max=parseFloat(currency.total);
//                 console.log(currency.commission);
//                  //setCookie('total',response);
//                  document.getElementById("max_selling_amount").innerHTML="maximum selling amount = "+ parseFloat(currency.total);;
//                  document.getElementById("transfer_amount_in").setAttribute("max",parseFloat(currency.total));
//                  document.getElementById("max_selling_amount").style.color="green";
//                  document.getElementById("input_commission").value=parseFloat(currency.commission);
//                  document.getElementById("input_selling_rate").value=parseFloat(currency.selling_rate);
                                
//             }
//             else{
//                 console.log("no any response");
//             }
//         }
//     }); 
// }

// function calculate_total(){
//     console.log("got it");
//     var reqd_amount=document.getElementById('transfer_amount_in').value;
//     var rate=document.getElementById('input_selling_rate').value;
//     var commission=document.getElementById('input_commission').value;
//     var total=reqd_amount*rate*(1+commission/100);
//     document.getElementById('total_amount').value=total.toFixed(2);
//     console.log(total);
// }


function get_currency_details($currency,$purpose){
    $id=document.getElementById('currency_selector').value;
    setCookie('currency_name',$currency);
    //alert($curr);
    $.ajax({

        type: "GET",
         url: "./controller/get_currency_details.php",
         
         success : function(response)
         {
             if(response){
                alert(response);
                var currency=JSON.parse(response);
                if($purpose == 'sell'){
                    //setCookie('total',response);
                 document.getElementById("max_selling_amount").innerHTML="maximum selling amount = "+ parseFloat(currency.total);;
                 document.getElementById("transfer_amount_in").setAttribute("max",parseFloat(currency.total));
                 document.getElementById("max_selling_amount").style.color="green";
                 document.getElementById("input_commission").value=parseFloat(currency.commission);
                 document.getElementById("input_selling_rate").value=parseFloat(currency.selling_rate);

                }
                else{
                    console.log("BUY");
                    document.getElementById("input_commission").value=parseFloat(currency.commission);
                    document.getElementById("input_purchasing_rate").value=parseFloat(currency.purchase_rate);

                }
                 
                                
            }
            else{
                console.log("no any response");
            }
        }
    }); 
}

function calculate_total($purpose){
    if($purpose=='sell'){
        console.log("got it");
        var reqd_amount=document.getElementById('transfer_amount_in').value;
        var rate=document.getElementById('input_selling_rate').value;
        var commission=document.getElementById('input_commission').value;
        var total=reqd_amount*rate*(1+commission/100);
        document.getElementById('total_amount').value=total.toFixed(2);
        console.log(total);

    }
    else{
        console.log('BUY');
        var reqd_amount=document.getElementById('transfer_amount_in').value;
        var rate=document.getElementById('input_purchasing_rate').value;
        var commission=document.getElementById('input_commission').value;
        var total=reqd_amount*rate;
        var pay_to_customer=total*(1-commission/100);
        document.getElementById('total_amount').value=total.toFixed(2);
        document.getElementById('pay_to_customer').value=pay_to_customer.toFixed(2);
    }
    
}



// $(function() {
//     Morris.Donut({
//             element: 'morris-donut-chart',
//             data: [{
//                 label: "Download Sales",
//                 value: 12
//             }, {
//                 label: "In-Store Sales",
//                 value: 30
//             }, {
//                 label: "Mail-Order Sales",
//                 value: 20
//             }],
//             resize: true
//         });
// });

$(function() {
    $.ajax({

        type: "GET",
         url: "controller/top_sales.php",
         success : function(text)
         {
             status = text;
             var array=JSON.parse(text);
             var data=[];
             for(var i=0; i<array.length;i++){
                 data.push({
                     'label':array[i].currency,
                     'value':parseInt(array[i].total_sold)

                 });
                 
                //  data[i]['currency']=array[i].currency;
                //  data[i]['sales']=parseInt(array[i].total_sales);

             }
             Morris.Donut({
                element: 'morris-donut-chart',
                data: data,
                resize: true
            });
            console.log(data);

         }
    });

    //BAR CHART
    $.ajax({

        type: "GET",
         url: "controller/branch_stat.php",
         success : function(text)
         {
             status = text;
             var array=JSON.parse(text);
             var data=[];
             for(var i=0; i<array.length;i++){
                 data.push({
                     'branch':array[i].name,
                     'worth':parseInt(array[i].worth)

                 });
                 
                //  data[i]['currency']=array[i].currency;
                //  data[i]['sales']=parseInt(array[i].total_sales);

             }
             Morris.Bar({
                element: 'morris-bar-chart',
                data: data,
                xkey: 'branch',
                ykeys: ['worth'],
                labels: ['Worth'],
                hideHover: 'auto',
                resize: true
            });
            console.log(data);

         }
    });


    $.ajax({

        type: "GET",
         url: "controller/daily_sales.php",
         success : function(text)
         {
             status = text;
             var array=JSON.parse(text);
             var data=[];
             for(var i=0; i<array.length;i++){
                 data.push({
                     'label':array[i].currency,
                     'value':parseInt(array[i].total_sold)

                 });
                 
                //  data[i]['currency']=array[i].currency;
                //  data[i]['sales']=parseInt(array[i].total_sales);

             }
             Morris.Donut({
                element: 'morris-donut-chart2',
                data: data,
                resize: true
            });
            console.log(data);

         }
    });

    
});
=======
<<<<<<< HEAD
// ***************************** ADMIN SECTION *****************************************************************************



/*function remove_branch($branchID){
	alert($branchID);

	$.ajax({

                type: "POST",
                 url: "controller/branch_remove.php",
                 async: false,
                 data: {branchID:$branchID},
                 success : function(text)
                 {
                     status = text;
                     alert(status);
                 }
      });
	
}
*/

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue ;
}

var branchID;
function remove_branch($branchID){
	swal({
		title: "Are you sure?",
		text: "Once deleted, you will not be able to recover this information!",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			$.ajax({

                type: "POST",
                 url: "controller/branch_remove.php",
                 async: false,
                 data: {branchID:$branchID},
                 success : function(text)
                 {
                     status = text;
                     swal("This branch has been deleted!", {
						icon: "success",
					 });
					 location.reload();

                 }
      });


			
		} 
	});

	
}

function edit_branch($branchID,$branchName,$branchAddress,$contact){

	document.getElementById("edit_branch_area").style.display="block";
	document.getElementById("branch_name").value=$branchName;
	document.getElementById("branch_address").value=$branchAddress;
	document.getElementById("branch_contact").value=$contact;	
	branchID=$branchID;
}

function update_branch(){
	
	var new_name=document.getElementById("branch_name").value;
	var new_address=document.getElementById("branch_address").value;
	var new_contact=document.getElementById("branch_contact").value;
	$.ajax({

                type: "POST",
                 url: "controller/branch_update.php",
                 async: false,
                 data: {branchID:branchID,name:new_name,address:new_address,contact:new_contact},
                 success : function(text)
                 {
                     status = text;
                     
                 }
      });

	alert(status);
	location.reload();

	


}

function register_branch(){
	var name=document.getElementById("input_branch_name").value;
	var address=document.getElementById("input_branch_address").value;
	var contact=document.getElementById("input_branch_contact").value;
	alert(name+address+contact);
	$.ajax({

                type: "POST",
                 url: "controller/branch_add.php",
                 async: false,
                 data: {name:name,address:address,contact:contact},
                 success : function(text)
                 {
                     status = text;
                     
                 }
      });

	alert(status);
	windows.location.replace('branch_manage.php');

}

function authenticate_admin(){
    var username=document.getElementById('admin_username_in').value;
    var password=document.getElementById('admin_password_in').value;
    var authenticated=false;
    $.ajax({

        type: "POST",
         url: "./controller/admin_authenticate.php",
         async: false,
         data: {admin_username_in:username,admin_password_in:password},
         success : function(response)
         {
             if(response){
                 
                 var arr=JSON.parse(response);
                 setCookie('username',arr[0]);
                 var branch=arr.slice(1);
                 
                 setCookie('branch',branch);
                 setCookie('branch_selected',branch[0]);
                 authenticated = true;
             }
             else
             {
                 alert("Username or Password incorrect");
             }
             
         }
});
if(authenticated){
    
    location.replace("admin.php");
    
}

}

function remove_staff($staffID){
	swal({
		title: "Are you sure?",
		text: "Once deleted, you will not be able to recover this information!",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			$.ajax({

                type: "POST",
                 url: "controller/staff_remove.php",
                 async: false,
                 data: {staffID:$staffID},
                 success : function(text)
                 {
                     status = text;
                     swal("This staff has been deleted!", {
						icon: "success",
					 });
					 location.reload();

                 }
      });


			
		} 
	});

	
}


function add_currency(){
	var name=document.getElementById("input_currency_name").value;
	var amount=document.getElementById("input_currency_amount").value;
    var image=document.getElementById("input_currency_image").files[0].name;
    alert(image);
    	
	$.ajax({

                type: "POST",
                 url: "controller/inventory_add.php",
                 async: false,
                 data: {name:name,amount:amount,image:image},
                 success : function(text)
                 {
                     status = text;
                     alert(status);
                     
                 }
      });

}






//***************************************This is Staff Section************************************************************************

function authenticate_staff(){
    var username=document.getElementById('staff_username_in').value;
    var password=document.getElementById('staff_password_in').value;
    var branch=document.getElementById('staff_branch_in').value;
    var authenticated=false;
    $.ajax({

        type: "POST",
         url: "./controller/staff_authenticate.php",
         async: false,
         data: {username:username,password:password,branch:branch},
         success : function(response)
         {
             if(response){
                 alert(response);
                 
                 authenticated = true;
             }
             else
             {
                 alert("Username, Password or Branch incorrect");
             }
             
         }
});
if(authenticated){
    
    location.replace("staff.php");
    
}
}


function check_currency_balance($currency){
    $id=document.getElementById('currency_selector').value;
    setCookie('currency_name',$currency);
    //alert($curr);
    $.ajax({

        type: "POST",
         url: "./controller/check_currency_balance.php",
         async: false,
         data: {id:$id},
         success : function(response)
         {
             if(response){
                alert(response);
                console.log(response);
                 //setCookie('total',response);
                 document.getElementById("max_transfer_amount").innerHTML="maximum transferable amount = "+ response;
                 document.getElementById("transfer_amount_in").setAttribute("max",response);
                 document.getElementById("max_transfer_amount").style.color="green";
                 
                 
            }
            else{
                console.log("no any response");
            }
        }
    }); 
}



// function get_currency_details($currency){
//     $id=document.getElementById('currency_selector').value;
//     setCookie('currency_name',$currency);
//     //alert($curr);
//     $.ajax({

//         type: "GET",
//          url: "./controller/get_currency_details.php",
         
//          success : function(response)
//          {
//              if(response){
//                 alert(response);
//                 var currency=JSON.parse(response);
//                 var max=parseFloat(currency.total);
//                 console.log(currency.commission);
//                  //setCookie('total',response);
//                  document.getElementById("max_selling_amount").innerHTML="maximum selling amount = "+ parseFloat(currency.total);;
//                  document.getElementById("transfer_amount_in").setAttribute("max",parseFloat(currency.total));
//                  document.getElementById("max_selling_amount").style.color="green";
//                  document.getElementById("input_commission").value=parseFloat(currency.commission);
//                  document.getElementById("input_selling_rate").value=parseFloat(currency.selling_rate);
                                
//             }
//             else{
//                 console.log("no any response");
//             }
//         }
//     }); 
// }

// function calculate_total(){
//     console.log("got it");
//     var reqd_amount=document.getElementById('transfer_amount_in').value;
//     var rate=document.getElementById('input_selling_rate').value;
//     var commission=document.getElementById('input_commission').value;
//     var total=reqd_amount*rate*(1+commission/100);
//     document.getElementById('total_amount').value=total.toFixed(2);
//     console.log(total);
// }


function get_currency_details($currency,$purpose){
    $id=document.getElementById('currency_selector').value;
    setCookie('currency_name',$currency);
    //alert($curr);
    $.ajax({

        type: "GET",
         url: "./controller/get_currency_details.php",
         
         success : function(response)
         {
             if(response){
                alert(response);
                var currency=JSON.parse(response);
                if($purpose == 'sell'){
                    //setCookie('total',response);
                 document.getElementById("max_selling_amount").innerHTML="maximum selling amount = "+ parseFloat(currency.total);;
                 document.getElementById("transfer_amount_in").setAttribute("max",parseFloat(currency.total));
                 document.getElementById("max_selling_amount").style.color="green";
                 document.getElementById("input_commission").value=parseFloat(currency.commission);
                 document.getElementById("input_selling_rate").value=parseFloat(currency.selling_rate);

                }
                else{
                    console.log("BUY");
                    document.getElementById("input_commission").value=parseFloat(currency.commission);
                    document.getElementById("input_purchasing_rate").value=parseFloat(currency.purchase_rate);

                }
                 
                                
            }
            else{
                console.log("no any response");
            }
        }
    }); 
}

function calculate_total($purpose){
    if($purpose=='sell'){
        console.log("got it");
        var reqd_amount=document.getElementById('transfer_amount_in').value;
        var rate=document.getElementById('input_selling_rate').value;
        var commission=document.getElementById('input_commission').value;
        var total=reqd_amount*rate*(1+commission/100);
        document.getElementById('total_amount').value=total.toFixed(2);
        console.log(total);

    }
    else{
        console.log('BUY');
        var reqd_amount=document.getElementById('transfer_amount_in').value;
        var rate=document.getElementById('input_purchasing_rate').value;
        var commission=document.getElementById('input_commission').value;
        var total=reqd_amount*rate;
        var pay_to_customer=total*(1-commission/100);
        document.getElementById('total_amount').value=total.toFixed(2);
        document.getElementById('pay_to_customer').value=pay_to_customer.toFixed(2);
    }
    
}
=======
// ***************************** ADMIN SECTION *****************************************************************************



/*function remove_branch($branchID){
	alert($branchID);

	$.ajax({

                type: "POST",
                 url: "controller/branch_remove.php",
                 async: false,
                 data: {branchID:$branchID},
                 success : function(text)
                 {
                     status = text;
                     alert(status);
                 }
      });
	
}
*/

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue ;
}

var branchID;
function remove_branch($branchID){
	swal({
		title: "Are you sure?",
		text: "Once deleted, you will not be able to recover this information!",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			$.ajax({

                type: "POST",
                 url: "controller/branch_remove.php",
                 async: false,
                 data: {branchID:$branchID},
                 success : function(text)
                 {
                     status = text;
                     swal("This branch has been deleted!", {
						icon: "success",
					 });
					 location.reload();

                 }
      });


			
		} 
	});

	
}

function edit_branch($branchID,$branchName,$branchAddress,$contact){

	document.getElementById("edit_branch_area").style.display="block";
	document.getElementById("branch_name").value=$branchName;
	document.getElementById("branch_address").value=$branchAddress;
	document.getElementById("branch_contact").value=$contact;	
	branchID=$branchID;
}

function update_branch(){
	
	var new_name=document.getElementById("branch_name").value;
	var new_address=document.getElementById("branch_address").value;
	var new_contact=document.getElementById("branch_contact").value;
	$.ajax({

                type: "POST",
                 url: "controller/branch_update.php",
                 async: false,
                 data: {branchID:branchID,name:new_name,address:new_address,contact:new_contact},
                 success : function(text)
                 {
                     status = text;
                     
                 }
      });

	alert(status);
	location.reload();

	


}

function register_branch(){
	var name=document.getElementById("input_branch_name").value;
	var address=document.getElementById("input_branch_address").value;
	var contact=document.getElementById("input_branch_contact").value;
	alert(name+address+contact);
	$.ajax({

                type: "POST",
                 url: "controller/branch_add.php",
                 async: false,
                 data: {name:name,address:address,contact:contact},
                 success : function(text)
                 {
                     status = text;
                     
                 }
      });

	alert(status);
	windows.location.replace('branch_manage.php');

}

function authenticate_admin(){
    var username=document.getElementById('admin_username_in').value;
    var password=document.getElementById('admin_password_in').value;
    var authenticated=false;
    $.ajax({

        type: "POST",
         url: "./controller/admin_authenticate.php",
         async: false,
         data: {admin_username_in:username,admin_password_in:password},
         success : function(response)
         {
             if(response){
                 
                 var arr=JSON.parse(response);
                 setCookie('username',arr[0]);
                 var branch=arr.slice(1);
                 
                 setCookie('branch',branch);
                 setCookie('branch_selected',branch[0]);
                 authenticated = true;
             }
             else
             {
                 alert("Username or Password incorrect");
             }
             
         }
});
if(authenticated){
    
    location.replace("admin.php");
    
}

}

function remove_staff($staffID){
	swal({
		title: "Are you sure?",
		text: "Once deleted, you will not be able to recover this information!",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			$.ajax({

                type: "POST",
                 url: "controller/staff_remove.php",
                 async: false,
                 data: {staffID:$staffID},
                 success : function(text)
                 {
                     status = text;
                     swal("This staff has been deleted!", {
						icon: "success",
					 });
					 location.reload();

                 }
      });


			
		} 
	});

	
}


function add_currency(){
	var name=document.getElementById("input_currency_name").value;
	var amount=document.getElementById("input_currency_amount").value;
    var image=document.getElementById("input_currency_image").files[0].name;
    alert(image);
    	
	$.ajax({

                type: "POST",
                 url: "controller/inventory_add.php",
                 async: false,
                 data: {name:name,amount:amount,image:image},
                 success : function(text)
                 {
                     status = text;
                     alert(status);
                     
                 }
      });

}






//***************************************This is Staff Section************************************************************************

function authenticate_staff(){
    var username=document.getElementById('staff_username_in').value;
    var password=document.getElementById('staff_password_in').value;
    var branch=document.getElementById('staff_branch_in').value;
    var authenticated=false;
    $.ajax({

        type: "POST",
         url: "./controller/staff_authenticate.php",
         async: false,
         data: {username:username,password:password,branch:branch},
         success : function(response)
         {
             if(response){
                 alert(response);
                 
                 authenticated = true;
             }
             else
             {
                 alert("Username, Password or Branch incorrect");
             }
             
         }
});
if(authenticated){
    
    location.replace("staff.php");
    
}
}


function check_currency_balance($currency){
    $id=document.getElementById('currency_selector').value;
    setCookie('currency_name',$currency);
    //alert($curr);
    $.ajax({

        type: "POST",
         url: "./controller/check_currency_balance.php",
         async: false,
         data: {id:$id},
         success : function(response)
         {
             if(response){
                alert(response);
                console.log(response);
                 //setCookie('total',response);
                 document.getElementById("max_transfer_amount").innerHTML="maximum transferable amount = "+ response;
                 document.getElementById("transfer_amount_in").setAttribute("max",response);
                 document.getElementById("max_transfer_amount").style.color="green";
                 
                 
            }
            else{
                console.log("no any response");
            }
        }
    }); 
}



// function get_currency_details($currency){
//     $id=document.getElementById('currency_selector').value;
//     setCookie('currency_name',$currency);
//     //alert($curr);
//     $.ajax({

//         type: "GET",
//          url: "./controller/get_currency_details.php",
         
//          success : function(response)
//          {
//              if(response){
//                 alert(response);
//                 var currency=JSON.parse(response);
//                 var max=parseFloat(currency.total);
//                 console.log(currency.commission);
//                  //setCookie('total',response);
//                  document.getElementById("max_selling_amount").innerHTML="maximum selling amount = "+ parseFloat(currency.total);;
//                  document.getElementById("transfer_amount_in").setAttribute("max",parseFloat(currency.total));
//                  document.getElementById("max_selling_amount").style.color="green";
//                  document.getElementById("input_commission").value=parseFloat(currency.commission);
//                  document.getElementById("input_selling_rate").value=parseFloat(currency.selling_rate);
                                
//             }
//             else{
//                 console.log("no any response");
//             }
//         }
//     }); 
// }

// function calculate_total(){
//     console.log("got it");
//     var reqd_amount=document.getElementById('transfer_amount_in').value;
//     var rate=document.getElementById('input_selling_rate').value;
//     var commission=document.getElementById('input_commission').value;
//     var total=reqd_amount*rate*(1+commission/100);
//     document.getElementById('total_amount').value=total.toFixed(2);
//     console.log(total);
// }


function get_currency_details($currency,$purpose){
    $id=document.getElementById('currency_selector').value;
    setCookie('currency_name',$currency);
    //alert($curr);
    $.ajax({

        type: "GET",
         url: "./controller/get_currency_details.php",
         
         success : function(response)
         {
             if(response){
                alert(response);
                var currency=JSON.parse(response);
                if($purpose == 'sell'){
                    //setCookie('total',response);
                 document.getElementById("max_selling_amount").innerHTML="maximum selling amount = "+ parseFloat(currency.total);;
                 document.getElementById("transfer_amount_in").setAttribute("max",parseFloat(currency.total));
                 document.getElementById("max_selling_amount").style.color="green";
                 document.getElementById("input_commission").value=parseFloat(currency.commission);
                 document.getElementById("input_selling_rate").value=parseFloat(currency.selling_rate);

                }
                else{
                    console.log("BUY");
                    document.getElementById("input_commission").value=parseFloat(currency.commission);
                    document.getElementById("input_purchasing_rate").value=parseFloat(currency.purchase_rate);

                }
                 
                                
            }
            else{
                console.log("no any response");
            }
        }
    }); 
}

function calculate_total($purpose){
    if($purpose=='sell'){
        console.log("got it");
        var reqd_amount=document.getElementById('transfer_amount_in').value;
        var rate=document.getElementById('input_selling_rate').value;
        var commission=document.getElementById('input_commission').value;
        var total=reqd_amount*rate*(1+commission/100);
        document.getElementById('total_amount').value=total.toFixed(2);
        console.log(total);

    }
    else{
        console.log('BUY');
        var reqd_amount=document.getElementById('transfer_amount_in').value;
        var rate=document.getElementById('input_purchasing_rate').value;
        var commission=document.getElementById('input_commission').value;
        var total=reqd_amount*rate;
        var pay_to_customer=total*(1-commission/100);
        document.getElementById('total_amount').value=total.toFixed(2);
        document.getElementById('pay_to_customer').value=pay_to_customer.toFixed(2);
    }
    
}



// $(function() {
//     Morris.Donut({
//             element: 'morris-donut-chart',
//             data: [{
//                 label: "Download Sales",
//                 value: 12
//             }, {
//                 label: "In-Store Sales",
//                 value: 30
//             }, {
//                 label: "Mail-Order Sales",
//                 value: 20
//             }],
//             resize: true
//         });
// });

$(function() {

    $.ajax({

        type: "GET",
         url: "controller/top_sales.php",
         success : function(text)
         {
             status = text;
             var array=JSON.parse(text);
             var data=[];
             for(var i=0; i<array.length;i++){
                 data.push({
                     'label':array[i].currency,
                     'value':parseInt(array[i].total_sold)

                 });
                 
                //  data[i]['currency']=array[i].currency;
                //  data[i]['sales']=parseInt(array[i].total_sales);

             }
             Morris.Donut({
                element: 'morris-donut-chart',
                data: data,
                resize: true
            });
            console.log(data);

         }
    });

    $.ajax({

        type: "GET",
         url: "controller/daily_sales.php",
         success : function(text)
         {
             status = text;
             var array=JSON.parse(text);
             var data=[];
             for(var i=0; i<array.length;i++){
                 data.push({
                     'label':array[i].currency,
                     'value':parseInt(array[i].total_sold)

                 });
                 
                //  data[i]['currency']=array[i].currency;
                //  data[i]['sales']=parseInt(array[i].total_sales);

             }
             Morris.Donut({
                element: 'morris-donut-chart2',
                data: data,
                resize: true
            });
            console.log(data);

         }
    });

    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2010 Q1',
            iphone: 2666,
            ipad: null,
            itouch: 2647
        }, {
            period: '2010 Q2',
            iphone: 2778,
            ipad: 2294,
            itouch: 2441
        }, {
            period: '2010 Q3',
            iphone: 4912,
            ipad: 1969,
            itouch: 2501
        }, {
            period: '2010 Q4',
            iphone: 3767,
            ipad: 3597,
            itouch: 5689
        }, {
            period: '2011 Q1',
            iphone: 6810,
            ipad: 1914,
            itouch: 2293
        }, {
            period: '2011 Q2',
            iphone: 5670,
            ipad: 4293,
            itouch: 1881
        }, {
            period: '2011 Q3',
            iphone: 4820,
            ipad: 3795,
            itouch: 1588
        }, {
            period: '2011 Q4',
            iphone: 15073,
            ipad: 5967,
            itouch: 5175
        }, {
            period: '2012 Q1',
            iphone: 10687,
            ipad: 4460,
            itouch: 2028
        }, {
            period: '2012 Q2',
            iphone: 8432,
            ipad: 5713,
            itouch: 1791
        }],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['iPhone', 'iPad', 'iPod Touch'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
});
>>>>>>> f765383d0bd7046f34c5b28db568b38b79e019e7
>>>>>>> 846a105bdec1756a41f922c0e6ad4fbab1447d2f
