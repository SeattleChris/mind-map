const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);

let concepts = [];
let links = [];

function Links(from, to, weight) {
  this.from = from;
  this.to = to;
  this.title = `${from}-${to}`;
  this.value = weight;
  this.arrows = { enabled: true, scaleFactor: 1, type: 'arrow' };
  links.push(this);
}

function Concept(id, name, description, relations) {
  this.id = id;
  this.label = name;
  this.value = description;
  // this.value = weight || 15;
  this.shape = 'elipse';
  this.children = [];
  this.parents = [];
  if (relations.length) {
    // relations = [ {direction, id, weight}, ];
    for (let related of relations) {
      if (related.direction === 'to') {
        // delete related.direction;
        this.children.push(related);
        new Links(this.id, related.id, related.weight);
        // TODO: concepts[related.id].parents.push(this);
      } else if (related.direction === 'from') {
        // delete related.direction;
        this.parent.push(related);
        Links(related.id, this.id, related.weight);
        // TODO: concepts[related.id].children.push(this);
      }
    }  // end for loop of relations
  }  // end of relations exists check
  this.weight = (!this.children.length) ? 1 : 1 + this.children.reduce((acc, curr) => acc.weight + curr.weight);
  this.shape = 'elipse',
  concepts.push(this);
}  // end Concept construction function

let bigChildren = [
  { direction: 'to', id: 10, weight: 100 },
  { direction: 'to', id: 12, weight: 50 }
];
let anotherChildren = [
  {direction: 'to', id: 20, weight: 80 },
  {direction: 'to', id: 22, weight: 40 }
];


new Concept(10, 'Under Big', 'This supports Big Idea', []);
new Concept(12, '2nd Under Big', 'Also supports Big Idea', []);
new Concept(20, '1st of Another', 'Another Big Idea is supported by this', []);
new Concept(22, '2nd of Another', '2nd support of Another Big Idea', []);
new Concept(100, 'Big Idea', 'This is one of the biggest ideas', bigChildren);
new Concept(200, 'Another Big Idea', 'Second big thought', anotherChildren);
console.log(concepts);
console.log(links);

let template_nodes = [
  {
    id:'a',
    label: 'A',
    title: 'A title',
    value: 'A',
    shape: 'ellipse',
    // size: 15
  },
  {
    id:'b',
    label:'B',
    shape: 'ellipse',
    // size: 150
  },
  {
    id:'c',
    label:'C',
    title: 'C title',
    value: 'C',
    shape: 'ellipse'
  }
];

let template_edges = [
  {
    from:'a',
    to:'b',
    title: 'A-B',
    value: 1,
    arrows: {
      to: {enabled: true, scaleFactor:1, type:'arrow'}
    },
  },
  {
    from: 'c',
    to: 'a',
    title: 'A-C',
    value: 1
  }
];

// nodes = nodes.concat(concepts);
// console.log(nodes);
// console.log('======== Links ============');
// console.log(links);
// edges = edges.concat(links);
// console.log(edges);

let data = {
  nodes: concepts,
  edges: links
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
