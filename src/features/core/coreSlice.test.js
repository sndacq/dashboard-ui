import coreReducer from './coreSlice';

describe('core reducer', () => {
  it('should return the initial state', () => {
    expect(coreReducer(undefined, {}))
      .toEqual({
        alertNotification: {
          value: false,
          message: '',
        },
      });
  });

  it('should update state to show alert notification', () => {
    expect(
      coreReducer(undefined, {
        type: 'core/showAlertNotification',
        payload: 'test alert',
      }),
    ).toEqual({
      alertNotification: {
        value: true,
        message: 'test alert',
      },
    });
  });

  it('should update state to hide alert notification', () => {
    expect(
      coreReducer(undefined, {
        type: 'core/hideAlertNotification',
      }),
    ).toEqual({
      alertNotification: {
        value: false,
        message: '',
      },
    });
  });
});
