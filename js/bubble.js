const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);

let nodes = [
  {
    id:'a',
    label:'A'
  },
  {
    id:'b',
    label:'B'
  }
];

let edges = [
  {
    from:'a',
    to:'b'
  }
];

let data = {
  nodes: nodes,
  edges: edges
};

let options = {
  autoResize: true,
  height: '100%',
  width: '100%',
  locale: 'en',
  // locales: locales,
  clickToUse: false,
  // configure: {...},    // defined in the configure module.
  // edges: {...},        // defined in the edges module.
  // nodes: {...},        // defined in the nodes module.
  // groups: {...},       // defined in the groups module.
  // layout: {...},       // defined in the layout module.
  // interaction: {...},  // defined in the interaction module.
  // manipulation: {...}, // defined in the manipulation module.
  // physics: {...},      // defined in the physics module.
}

let container = document.querySelector('.network');
let network = new vis.Network(container, data, options);
