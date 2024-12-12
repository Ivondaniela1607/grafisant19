import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appImgErrorUser]",
  standalone: true,
})
export class ImgErrorUserDirective {
  constructor(private elementImg: ElementRef) {}
  @HostListener("error")
  onImageError() {
    this.elementImg.nativeElement.src = "assets/images/no-image-user.webp";
  }
}
