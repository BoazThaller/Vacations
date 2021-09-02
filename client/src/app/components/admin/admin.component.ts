import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public products:any = [];
  constructor(private productsService: ProductsService) { }

  public onEditClicked(product:any){
      console.log(product)
  }

  ngOnInit(): void {
    const observable = this.productsService.getAllProducts();
    observable.subscribe(productData => {
      this.products = productData;
      console.log(this.products)
    }, serverErrorResponse => {
      alert("Error! " + serverErrorResponse.message)
    });
  }
}
