(this["webpackJsonpreact-interactive-table"]=this["webpackJsonpreact-interactive-table"]||[]).push([[0],{17:function(t,n,e){t.exports=e(27)},27:function(t,n,e){"use strict";e.r(n);var r=e(0),o=e.n(r),i=e(7),a=e.n(i),u=e(1),c=e(8),l=e(9),s=e(13),f=e(10),d=e(14),b=e(2);function p(){var t=Object(u.a)(["\n  visibility: ",";\n  opacity: ",";\n\n  bottom: 100%;\n  left: ","px;\n  margin: 2px 3px;\n"]);return p=function(){return t},t}function m(){var t=Object(u.a)(["\n  visibility: ",";\n  opacity: ",";\n\n  top: ","px;\n  right: 100%;\n  margin: 3px 2px;\n"]);return m=function(){return t},t}function v(){var t=Object(u.a)(["\n  top: 1px;\n  left: 100%;\n"]);return v=function(){return t},t}function g(){var t=Object(u.a)(["\n  top: 100%;\n  left: 1px;\n"]);return g=function(){return t},t}function h(){var t=Object(u.a)(["\n  visibility: hidden;\n  opacity: 0;\n\n  background-color: #b20000;\n"]);return h=function(){return t},t}function x(){var t=Object(u.a)(["\n  background-color: #f3a500;\n"]);return x=function(){return t},t}function w(){var t=Object(u.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n\n  height: ","px;\n  width: ","px;\n  margin: 2px;\n\n  color: #ffffff;\n\n  font-size: ","px;\n  font-weight: bold;\n  text-align: center;\n\n  opacity: 1;\n\n  transition-duration: 0.6s;\n  cursor: pointer;\n\n  user-select: none;\n\n  &:hover {\n    opacity: 0.8;\n    transition-duration: 0.5s;\n  }\n"]);return w=function(){return t},t}function S(){var t=Object(u.a)(["\n  height: ","px;\n  min-width: ","px;\n  min-height: ","px;\n\n  padding: 0;\n\n  background-color: #48aae6;\n\n  user-select: none;\n"]);return S=function(){return t},t}function y(){var t=Object(u.a)(["\n  border: 1px solid #48aae6;\n  cursor: grab;\n  user-select: none;\n"]);return y=function(){return t},t}function j(){var t=Object(u.a)(["\n  position: absolute;\n  user-select: none;\n"]);return j=function(){return t},t}function R(){var t=Object(u.a)(["\n  display: flex;\n  justify-content: center;\n\n  user-select: none;\n"]);return R=function(){return t},t}var C=b.a.div(R()),O=b.a.div(j()),E=b.a.table(y()),I=b.a.td(S(),(function(t){return t.cellSize}),(function(t){return t.cellSize}),(function(t){return t.cellSize})),D=b.a.div(w(),(function(t){return t.cellSize}),(function(t){return t.cellSize}),(function(t){return t.cellSize/2})),z=Object(b.a)(D)(x()),B=Object(b.a)(D)(h()),k=Object(b.a)(z)(g()),V=Object(b.a)(z)(v()),q=Object(b.a)(B)(m(),(function(t){return!0===t.buttonsVisible?"visible":"hidden"}),(function(t){return!0===t.buttonsVisible?1:0}),(function(t){var n=t.cellSize,e=t.currentRowIndex;return n*e+2*e})),K=Object(b.a)(B)(p(),(function(t){return!0===t.buttonsVisible?"visible":"hidden"}),(function(t){return!0===t.buttonsVisible?1:0}),(function(t){var n=t.cellSize,e=t.currentCellIndex;return n*e+2*e})),M=function(t){function n(t){var e;return Object(c.a)(this,n),(e=Object(s.a)(this,Object(f.a)(n).call(this,t))).createSquare=function(){for(var t=[],n=[],r=e.props,o=r.initialHeight,i=r.initialWidth,a=0;a<i;a++)n[a]=e.uniqueKey++;for(var u=0;u<o;u++)t[u]=e.uniqueKey++;e.setState({rows:t,columns:n})},e.onDragStart=function(t){var n=t.clientX,r=t.clientY;e.offsetX=n-e.containerRef.current.getBoundingClientRect().left,e.offsetY=r-e.containerRef.current.getBoundingClientRect().top,e.setState({dragging:!0})},e.onDragging=function(t){var n=t.pageX,r=t.pageY;e.state.dragging&&(e.containerRef.current.style.left=n-e.offsetX+"px",e.containerRef.current.style.top=r-e.offsetY+"px")},e.onDragEnd=function(){e.setState({dragging:!1})},e.movingButtons=function(t){var n=t.target;"TD"===n.tagName&&e.setState({currentCellIndex:n.cellIndex,currentRowIndex:n.parentNode.rowIndex})},e.createColumn=function(){var t=e.state.columns;e.setState({columns:t.concat(e.uniqueKey++)})},e.createRow=function(){var t=e.state.rows;e.setState({rows:t.concat(e.uniqueKey++)})},e.deleteColumn=function(){var t=e.state,n=t.currentCellIndex,r=t.columns,o=r.length-1;r.length>1&&e.setState({columns:r.filter((function(t,e){return e!==n}))}),n===o&&e.setState((function(t){return{currentCellIndex:t.currentCellIndex-1}})),o<=1&&e.setState({removeColumnButtonDisplay:!1})},e.deleteRow=function(){var t=e.state,n=t.currentRowIndex,r=t.rows,o=r.length-1;r.length>1&&e.setState({rows:r.filter((function(t,e){return e!==n}))}),n===o&&e.setState((function(t){return{currentRowIndex:t.currentRowIndex-1}})),o<=1&&e.setState({removeRowButtonDisplay:!1})},e.showButtons=function(){var t=e.state,n=t.rows,r=t.columns;n.length>1&&e.setState({buttonsVisible:!0,removeRowButtonDisplay:!0}),r.length>1&&e.setState({buttonsVisible:!0,removeColumnButtonDisplay:!0})},e.hideButtons=function(){e.setState({buttonsVisible:!1})},e.state={rows:[],columns:[],currentCellIndex:0,currentRowIndex:0,buttonsVisible:!1,removeRowButtonDisplay:!0,removeColumnButtonDisplay:!0,dragging:!1},e.containerRef=o.a.createRef(),e.uniqueKey=0,e.offsetX=0,e.offsetY=0,e}return Object(d.a)(n,t),Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.createSquare(),document.addEventListener("mousemove",(function(n){return t.onDragging(n)})),document.addEventListener("mouseup",(function(){return t.onDragEnd()})),console.log("Version [1.2]. Created at 19.11.2019, 09:50.")}},{key:"render",value:function(){var t=this.props.cellSize,n=this.state,e=n.rows,r=n.columns,i=n.buttonsVisible,a=n.removeRowButtonDisplay,u=n.removeColumnButtonDisplay,c=n.currentRowIndex,l=n.currentCellIndex;return o.a.createElement(C,null,o.a.createElement(O,{ref:this.containerRef,onMouseOver:this.movingButtons},o.a.createElement("div",{onMouseEnter:this.showButtons,onMouseLeave:this.hideButtons},o.a.createElement(E,{onMouseDown:this.onDragStart,onDragStart:function(){return!1}},o.a.createElement("tbody",null,e.map((function(n){return o.a.createElement("tr",{key:"row-".concat(n),"data-test":"row"},r.map((function(n){return o.a.createElement(I,{"data-test":"cell",key:"cell-".concat(n),cellSize:t})})))})))),a&&o.a.createElement(q,{"data-test":"remove-row-button",onClick:this.deleteRow,cellSize:t,currentRowIndex:c,buttonsVisible:i},"-"),u&&o.a.createElement(K,{"data-test":"remove-column-button",onClick:this.deleteColumn,cellSize:t,currentCellIndex:l,buttonsVisible:i},"-")),o.a.createElement(k,{"data-test":"add-row-button",cellSize:t,onClick:this.createRow},"+"),o.a.createElement(V,{"data-test":"add-column-button",cellSize:t,onClick:this.createColumn},"+")))}}]),n}(o.a.Component);function X(){var t=Object(u.a)(["\n  display: flex;\n  justify-content: space-around;\n  padding-top: 150px;\n"]);return X=function(){return t},t}var Y=b.a.div(X());var H=function(){return o.a.createElement(Y,null,o.a.createElement(M,{initialWidth:4,initialHeight:4,cellSize:50}),o.a.createElement(M,{initialWidth:4,initialHeight:4,cellSize:50}))};a.a.render(o.a.createElement(H,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.c3cb7367.chunk.js.map