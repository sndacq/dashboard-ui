import expenseReducer from './expenseSlice';

const sampleList = [
  { id: 'item1' },
  { id: 'item2' },
  { id: 'item3' },
];

const initialState = {
  list: [],
  dialog: {
    value: false,
  },
  categories: [],
  accounts: [],
};

describe('expense reducer', () => {
  it('should return the initial state', () => {
    expect(expenseReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should update state to show dialog', () => {
    expect(
      expenseReducer(undefined, {
        type: 'expense/showDialog',
        payload: {
          activeItem: { testKey: 'testValue' },
          effect: 'test effect',
        },
      }),
    ).toEqual({
      list: [],
      categories: [],
      accounts: [],
      dialog: {
        value: true,
        activeItem: { testKey: 'testValue' },
        effect: 'test effect',
      },
    });
  });

  it('should update state to hide dialog', () => {
    expect(
      expenseReducer(undefined, {
        type: 'expense/hideDialog',
      }),
    ).toEqual({
      list: [],
      categories: [],
      accounts: [],
      dialog: {
        value: false,
        activeItem: {},
        effect: '',
      },
    });
  });

  it('should update expense list from initial state', () => {
    const fetchedList = ['foo', 'bar', 'test'];
    expect(expenseReducer(undefined, {
      type: 'expense/updateExpenseList',
      payload: fetchedList,
    })).toEqual({
      ...initialState,
      list: fetchedList,
    });
  });

  it('should update expense list from given state', () => {
    const fetchedList = ['foo', 'bar', 'test'];
    const sampleState = {
      ...initialState,
      list: sampleList,
    };
    expect(expenseReducer(sampleState, {
      type: 'expense/updateExpenseList',
      payload: fetchedList,
    })).toEqual({
      ...initialState,
      list: fetchedList,
    });
  });

  it('should add entry to expense list', () => {
    const sampleState = {
      ...initialState,
      list: sampleList,
    };
    const newItem = { id: 'new item' };
    expect(expenseReducer(sampleState, {
      type: 'expense/addExpense',
      payload: newItem,
    })).toEqual({
      ...sampleState,
      list: [...sampleList, newItem],
    });
  });

  it('should remove entry from expense list', () => {
    const sampleState = {
      ...initialState,
      list: sampleList,
    };
    const testItem = 'item1';
    const updatedList = [
      { id: 'item2' },
      { id: 'item3' },
    ];
    expect(expenseReducer(sampleState, {
      type: 'expense/removeExpense',
      payload: testItem,
    })).toEqual({
      ...sampleState,
      list: updatedList,
    });
  });

  it('should update an entry in expense list', () => {
    const sampleState = {
      ...initialState,
      list: sampleList,
    };
    const updatedItem = { id: 'item1', testKey: 'updated value' };

    const updatedList = [
      updatedItem,
      { id: 'item2' },
      { id: 'item3' },
    ];
    expect(expenseReducer(sampleState, {
      type: 'expense/editExpense',
      payload: updatedItem,
    })).toEqual({
      ...sampleState,
      list: updatedList,
    });
  });

  it('should update account list from initial state', () => {
    const fetchedList = ['foo', 'bar', 'test'];
    expect(expenseReducer(undefined, {
      type: 'expense/updateAccountList',
      payload: fetchedList,
    })).toEqual({
      ...initialState,
      accounts: fetchedList,
    });
  });

  it('should update account list from given state', () => {
    const fetchedList = ['foo', 'bar', 'test'];
    const sampleState = {
      ...initialState,
      accounts: sampleList,
    };
    expect(expenseReducer(sampleState, {
      type: 'expense/updateAccountList',
      payload: fetchedList,
    })).toEqual({
      ...initialState,
      accounts: fetchedList,
    });
  });

  it('should update category list from initial state', () => {
    const fetchedList = ['foo', 'bar', 'test'];
    expect(expenseReducer(undefined, {
      type: 'expense/updateCategoryList',
      payload: fetchedList,
    })).toEqual({
      ...initialState,
      categories: fetchedList,
    });
  });

  it('should update category list from given state', () => {
    const fetchedList = ['foo', 'bar', 'test'];
    const sampleState = {
      ...initialState,
      categories: sampleList,
    };
    expect(expenseReducer(sampleState, {
      type: 'expense/updateCategoryList',
      payload: fetchedList,
    })).toEqual({
      ...initialState,
      categories: fetchedList,
    });
  });
});
