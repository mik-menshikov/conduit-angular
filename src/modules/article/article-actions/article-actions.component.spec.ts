import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ArticleActionsComponent } from './article-actions.component';

@Component({
  selector: 'follow-button',
  template: '',
})
class FollowButtonStub {}

describe('ArticleActionsComponent', () => {
  let component: ArticleActionsComponent;
  let fixture: ComponentFixture<ArticleActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleActionsComponent, FollowButtonStub],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleActionsComponent);
    component = fixture.componentInstance;
    component.user = {
      image: 'src',
      username: 'user',
      following: false,
      bio: '',
    };
    component.articleSlug = 'slug';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show only author controls when isAuthorActions is true', () => {
    fixture.componentInstance.isAuthorActions = true;
    fixture.detectChanges();

    const editBtn = fixture.debugElement
      .queryAll(By.css('button'))
      .find((el) => el.nativeElement.textContent.includes('Edit article'));

    const removeBtn = fixture.debugElement
      .queryAll(By.css('button'))
      .find((el) => el.nativeElement.textContent.includes('Delete article'));

    const favoriteBtn = fixture.debugElement
      .queryAll(By.css('button'))
      .find((el) => el.nativeElement.textContent.includes('Favorite post'));

    expect(editBtn).toBeTruthy();
    expect(removeBtn).toBeTruthy();
    expect(favoriteBtn).toBeFalsy();
  });

  it('should show only public controls when isAuthorActions is false', () => {
    fixture.componentInstance.isAuthorActions = false;
    fixture.detectChanges();

    const editBtn = fixture.debugElement
      .queryAll(By.css('button'))
      .find((el) => el.nativeElement.textContent.includes('Edit article'));

    const removeBtn = fixture.debugElement
      .queryAll(By.css('button'))
      .find((el) => el.nativeElement.textContent.includes('Delete article'));

    const favoriteBtn = fixture.debugElement
      .queryAll(By.css('button'))
      .find((el) => el.nativeElement.textContent.includes('Favorite Post'));

    expect(editBtn).toBeFalsy();
    expect(removeBtn).toBeFalsy();
    expect(favoriteBtn).toBeTruthy();
  });

  it('should emit event on clicking Favorite', () => {
    component.isAuthorActions = false;
    spyOn(component.favorite, 'emit');
    fixture.detectChanges();

    const favoriteBtn = fixture.debugElement
      .queryAll(By.css('button'))
      .find((el) => el.nativeElement.textContent.includes('Favorite Post'));

    favoriteBtn?.triggerEventHandler('click', null);

    expect(component.favorite.emit).toHaveBeenCalledWith('slug');
  });
});
