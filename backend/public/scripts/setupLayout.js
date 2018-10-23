document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
$(document).ready(function(){
  $('.dropdown-trigger-nav').dropdown({
      constrainWidth: false,	
      hover: true,
      coverTrigger: false,
      closeOnClick: true
    }
  ),
  $('.dropdown-trigger-sidenav').dropdown({
      constrainWidth: true,	
      hover: false,
      coverTrigger: false,
      closeOnClick: true
    }
  );
});