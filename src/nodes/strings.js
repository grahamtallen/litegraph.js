//basic nodes
(function(global) {
  var LiteGraph = global.LiteGraph;

  function toString(a) {
    return String(a);
  }

  LiteGraph.wrapFunctionAsNode("string/toString", compare, ["*"], "String");

  function compare(a, b) {
    return a == b;
  }

  LiteGraph.wrapFunctionAsNode(
    "string/compare",
    compare,
    ["String", "String"],
    "Boolean"
  );

  function concatenate(a, b) {
    if (a === undefined) {
      return b;
    }
    if (b === undefined) {
      return a;
    }
    return a + b;
  }

  LiteGraph.wrapFunctionAsNode(
    "string/concatenate",
    concatenate,
    ["String", "String"],
    "String"
  );

  function contains(a, b) {
    if (a === undefined || b === undefined) {
      return false;
    }
    return a.indexOf(b) != -1;
  }

  LiteGraph.wrapFunctionAsNode(
    "string/contains",
    contains,
    ["String", "String"],
    "Boolean"
  );

  function toUpperCase(a) {
    if (a != null && a.constructor === String) {
      return a.toUpperCase();
    }
    return a;
  }

  LiteGraph.wrapFunctionAsNode(
    "string/toUpperCase",
    toUpperCase,
    ["String"],
    "String"
  );

  function split(a, b) {
    if (a != null && a.constructor === String) {
      return a.split(b || " ");
    }
    return [a];
  }

  LiteGraph.wrapFunctionAsNode(
    "string/split",
    toUpperCase,
    ["String", "String"],
    "Array"
  );

  function toFixed(a) {
    if (a != null && a.constructor === Number) {
      return a.toFixed(this.properties.precision);
    }
    return a;
  }

  LiteGraph.wrapFunctionAsNode(
    "string/toFixed",
    toFixed,
    ["Number"],
    "String",
    { precision: 0 }
  );


  function Test() {
  this.addInput("something", "string");
  this.addInput("start", "number");
}

Test.title = "Test";

LiteGraph.registerNodeType("string/test", Test);


  function SubString() {
    this.size = [60, 30];
    this.addInput("string", 0);
    this.addInput("start", "number");
    this.addInput("length", "number");
    this.addOutput("output", "string");
    this.properties =  {start:null,length:null}
    this.value = 0;
  }

  SubString.title = "SubString";

  SubString.prototype.onExecute = function() {
    if (this.inputs[0]) {
      this.value = this.getInputData(0);
    }
    if (this.inputs[1]) {
      this.properties.start = this.getInputData(1);
    }
    if (this.inputs[2]) {
      this.properties.length = this.getInputData(2);
    }
    if(this.value){
      if(this.properties.start != null){
        if(this.properties.length != null){
          this.setOutputData(0,this.value.substr(this.properties.start,this.properties.length))
        }else{
          this.setOutputData(0,this.value.substr(this.properties.start))
        }
      }else{
        this.setOutputData(0,this.value)
      }
    }

  };

  LiteGraph.registerNodeType("string/substring", SubString);

})(this);
