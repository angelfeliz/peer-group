import R from 'ramda';
import { then } from './promise';

export const serverError = (res, error) =>
  res.status(500).send('Something went wrong'); // TODO: Log error

export const validationError = (res, errors) => res.status(400).json({ errors });

export const defaultNoReturn = R.uncurryN(2, res => then(
  res.end.bind(res),
  err => serverError(res, err),
));

export const return200 = R.uncurryN(2, res => then(
  res.json.bind(res),
  err => serverError(res, err),
));
