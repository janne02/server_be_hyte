// mock data for simple API
const items = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item kolme'},
    {id: 4, name: 'Item neljä'},
  ];

  const getItems = (req, res) => {
    res.json(items);
  };

  // palauta vain se objekti, jonka id vastaa pyydettyä, muuten 404
  const getItemById =  (req, res) => {
    const itemFound = items.find(item => item.id == req.params.id);
    // console.log('found item', itemFound);
    if (itemFound) {
      res.json(itemFound);
    } else {
      res.status(404).json({error: 'not found'});
    }
  };

  const postItem = (req, res) => {
    // TODO: lisää postattu item items-taulukkoon
    console.log('postItem request body', req.body);
    if (!req.body.name) {
      res.status(400).json({error:"item name missing"});
    }
    //new id add 1 to last id number in the items array
    const newId = items(items.length-1).id +1;
    const newItem = {name: req.body.name};
    items.push(newItem);
    res.json({message: 'item created'});
  };

  const deleteItem = (req, res) => {
    // TODO: implement delete item
    // tip: array.findIndex() ?
    const itemFound = item.findIndex(item => item.id = req.params.id);
    if (index == -1) {
      // example how to send only the status code (still valid http response)
      return res.sendstatus(404);
    }
    const deleteItems = items.splice(index,1);
    console.log('deleteitem', deleteItems);
    res.json({delete_item: deleteItems[0]});
    //or succesful response without any content
    res.sendstatus(204);
  };
//bad request
  const putItem = (req, res) => {
    //ToDo implement modify item
    const index = items.findIndex(item => item.id = req.params.id);
    if (!index == -1) {
      return res.sendstatus(404).json({error: 'item name missing'});
    }
    items(index).name = req.body.name;
    res.json({message: 'not placeholder'});
  };


  export {getItems, getItemById, postItem, deleteItem, putItem};
