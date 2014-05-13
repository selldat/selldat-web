/*global jQuery:false */
/*jshint unused:false */
'use strict';

jQuery(document).ready(function($) {

  //Contact
  $('form.contactForm').submit(function(){

    var f = $(this).find('.form-group'), 
    exp,
    ferror = false, 
    result,
    emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function(){ // run all inputs
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if( rule !== undefined ){
      var ierror=false; // error flag for current input
      var pos = rule.indexOf( ':', 0 );
      if( pos >= 0 ){
        exp = rule.substr( pos+1, rule.length );
        rule = rule.substr(0, pos);
      }else{
        rule = rule.substr( pos+1, rule.length );
      }
      
      switch( rule ){
        case 'required':
        if( i.val()==='' ){ ferror=ierror=true; }
        break;
        
        case 'maxlen':
        if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
        break;

        case 'email':
        if( !emailExp.test(i.val()) ){ ferror=ierror=true; }
        break;

        case 'checked':
        if( !i.attr('checked') ){ ferror=ierror=true; }
        break;
        
        case 'regexp':
        exp = new RegExp(exp);
        if( !exp.test(i.val()) ){ ferror=ierror=true; }
        break;
      }
        i.next('.validation').html( ( ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
      }
    });
    f.children('textarea').each(function(){ // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if( rule !== undefined ){
      var ierror=false; // error flag for current input
      var pos = rule.indexOf( ':', 0 );
      if( pos >= 0 ){
        exp = rule.substr( pos+1, rule.length );
        rule = rule.substr(0, pos);
      }else{
        rule = rule.substr( pos+1, rule.length );
      }
      
      switch( rule ){
        case 'required':
        if( i.val()==='' ){ ferror=ierror=true; }
        break;
        
        case 'maxlen':
        if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
        break;
      }
        i.next('.validation').html( ( ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
      }
    });
    var str;
    if( ferror ) return false; 
      else str = $(this).serialize();   
        $.ajax({
        type: 'POST',
        url: 'contact/contact.php',
        data: str,
        success: function(msg){
      $('#sendmessage').addClass('show');
      $('#errormessage').ajaxComplete(function(event, request, settings){
    
      if(msg === 'OK')
      {
        $('#sendmessage').addClass('show');       
      }
      else
      {
        $('#sendmessage').removeClass('show');
        result = msg;
      }
    
      $(this).html(result);});}});
        return false;
  });

});