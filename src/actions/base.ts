/**
 * Interface for BaseAction - consists of 'type'.
 * The meta type is optional.
 * Pending promises will use this interface.
 */
export interface Action<T, M = {}> {
  type: T;
  meta: M;
}

/**
 * Interface for any action with a payload.
 * The meta type is optional.
 * Fulfilled promises will use this interface.
 */
export interface ActionWithPayload<T, P, M = {}> extends Action<T, M> {
  payload: P;
}

/**
 * Interface for any action with an error payload.
 * The meta type is optional.
 * Rejected promises will use this interface.
 */
export interface ActionWithError<T, P, M = {}> extends ActionWithPayload<T, P, M> {
  error: true;
}
