import { createAction, props } from '@ngrx/store';

export const loadTags = createAction('[Home] Load Tags');

export const loadTagsSuccess = createAction(
  '[Home] Load Tags Success',
  props<{ tags: string[] }>()
);

export const loadTagsFailure = createAction(
  '[Home] Load Tags Failure',
  props<{ error: any }>()
);
