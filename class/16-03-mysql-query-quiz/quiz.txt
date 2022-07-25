insert into product_category(id, name)
     values(uuid(), "전자제품")
;

insert into product_category(id, name)
     values(uuid(), "음식")
;

insert into product_category(id, name)
     values(uuid(), "의류")
;

select * 
  from product_category
;

update product
   set productCategoryId = "e61c13b0-0bf8-11ed-a3c7-2759485cf8c8"
 where name = "마우스"
    or name = "노트북"
;

select * 
  from product
;

select p.name as "상품명", pc.name as "카테고리명"
  from product p, product_category pc 
 where p.productCategoryId = pc.id
;