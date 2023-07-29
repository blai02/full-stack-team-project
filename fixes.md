fixed:
do not show cart if not logged in
remove cart state data after logging out
display subtotal, taxes, etc. in cart
fix message error on create product (fixed during demo)
add responsive mobile version of navbar
add additional route protection to edit product
  - must be correctly navigated to and additional check if is correct vendor
  - otherwise will show 404
navigate to home page after successful delete product if was on product detail page
fix bug on edit and delete product options
  - now correctly only shows the options if you are the product vendor
fix unauthorized bug on delete product (server bug)
rename title of page to eCommerce platform
todo:
add/remove discount client functionality