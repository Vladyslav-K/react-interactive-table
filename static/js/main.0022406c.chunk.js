(this["webpackJsonpreact-interactive-table"]=this["webpackJsonpreact-interactive-table"]||[]).push([[0],{19:function(t,e,n){t.exports=n(29)},29:function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),i=n(8),a=n.n(i),c=n(15),u=n(3),l=n(9),s=n(10),f=n(14),p=n(11),m=n(16),b=n(1),v=n(2);function d(){var t=Object(b.a)(["\n  display: ",";\n  visibility: ",";\n  opacity: ",";\n\n  bottom: 100%;\n  left: ","px;\n\n  margin: 2px 1px;\n"]);return d=function(){return t},t}function g(){var t=Object(b.a)(["\n  display: ",";\n  visibility: ",";\n  opacity: ",";\n\n  top: ","px;\n  right: 100%;\n\n  margin: 1px 2px;\n"]);return g=function(){return t},t}function h(){var t=Object(b.a)(["\n  top: 1px;\n  left: 100%;\n"]);return h=function(){return t},t}function y(){var t=Object(b.a)(["\n  top: 100%;\n  left: 1px;\n"]);return y=function(){return t},t}function w(){var t=Object(b.a)(["\n  display: block;\n  visibility: hidden;\n\n  background-color: #b20000;\n\n  line-height: ","px;\n"]);return w=function(){return t},t}function S(){var t=Object(b.a)(["\n  background-color: #f3a500;\n"]);return S=function(){return t},t}function B(){var t=Object(b.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n\n  height: ","px;\n  width: ","px;\n  margin: 2px;\n\n  color: #ffffff;\n\n  font-size: ","px;\n  font-weight: bold;\n  text-align: center;\n\n  opacity: 1;\n\n  transition-duration: 0.6s;\n  cursor: pointer;\n\n  user-select: none;\n\n  &:hover {\n    opacity: 0.8;\n    transition-duration: 0.5s;\n  }\n"]);return B=function(){return t},t}function x(){var t=Object(b.a)(["\n  height: ","px;\n  width: ","px;\n\n  padding: 0;\n\n  background-color: #48aae6;\n\n  user-select: none;\n"]);return x=function(){return t},t}function j(){var t=Object(b.a)(["\n  border: 1px solid #48aae6;\n  cursor: grab;\n  user-select: none;\n"]);return j=function(){return t},t}function O(){var t=Object(b.a)(["\n  display: inline-block;\n\n  position: absolute;\n\n  left: ",";\n  top: ",";\n\n  user-select: none;\n"]);return O=function(){return t},t}function C(){var t=Object(b.a)(["\n  height: 100vh;\n  width: 100vw;\n\n  margin: 0;\n  padding: 0;\n\n  user-select: none;\n"]);return C=function(){return t},t}var R=v.a.div(C()),D=v.a.div(O(),(function(t){return t.containerPosition.left}),(function(t){return t.containerPosition.top})),k=v.a.table(j()),z=v.a.td(x(),(function(t){return t.cellSize}),(function(t){return t.cellSize})),E=v.a.div(B(),(function(t){return t.cellSize}),(function(t){return t.cellSize}),(function(t){return t.cellSize/2})),I=Object(v.a)(E)(S()),T=Object(v.a)(E)(w(),(function(t){return t.cellSize-t.cellSize/5})),V=Object(v.a)(I)(y()),L=Object(v.a)(I)(h()),K=Object(v.a)(T)(g(),(function(t){return!0===t.removeRowButtonDisplay?"block":"none"}),(function(t){return!0===t.buttonsVisible?"visible":"hidden"}),(function(t){return!0===t.buttonsVisible?1:0}),(function(t){return t.removeRowButtonTop})),M=Object(v.a)(T)(d(),(function(t){return!0===t.removeColumnButtonDisplay?"block":"none"}),(function(t){return!0===t.buttonsVisible?"visible":"hidden"}),(function(t){return!0===t.buttonsVisible?1:0}),(function(t){return t.removeColumnButtonLeft})),P=function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(f.a)(this,Object(p.a)(e).call(this,t))).throttle=function(t,e){var n,o,r=!1;return function i(){if(r)return n=arguments,void(o=this);t.apply(this,arguments),r=!0,setTimeout((function(){r=!1,n&&(i.apply(o,n),n=o=null)}),e)}},n.createSquare=function(){for(var t=n.state,e=t.rows,o=t.columns,r=Object(u.a)(e),i=Object(u.a)(o),a=n.props,c=a.initialHeight,l=a.initialWidth,s=0;s<l;s++)i[s]={key:n.cellKey++};for(var f=0;f<c;f++)r[f]={key:n.rowKey++,columns:i};n.setState({rows:r,columns:i})},n.onDragStart=function(t){var e=t.clientX,o=t.clientY;n.offsetX=e-n.containerRef.current.getBoundingClientRect().left,n.offsetY=o-n.containerRef.current.getBoundingClientRect().top,n.setState({dragging:!0})},n.onDragging=function(t){var e=n.state.dragging;console.log(t.target),e&&(n.container.style.left=t.pageX-n.offsetX+"px",n.container.style.top=t.pageY-n.offsetY+"px")},n.onDrag=function(t){t.persist(),n.onDragging(t)},n.onDragEnd=function(){var t=n.container,e=t.style,o=Object(c.a)({},n.state.containerPosition);o.left=e.left,o.top=e.top,e.left&&e.top&&(n.setState({containerPosition:o}),t.removeAttribute("style")),n.setState({dragging:!1})},n.movingButtons=function(t){var e=t.target,o=n.state,r=o.currentRowIndex,i=o.currentCellIndex,a=o.removeColumnButtonLeft,c=o.removeRowButtonTop;"TD"===e.tagName&&(a=e.offsetLeft,c=e.offsetTop,i=e.cellIndex,r=e.parentNode.rowIndex),n.setState({currentRowIndex:r,currentCellIndex:i,removeColumnButtonLeft:a,removeRowButtonTop:c})},n.createColumn=function(){var t=n.state.columns,e=[].concat(Object(u.a)(t),[{key:n.cellKey++}]);n.setState({columns:e})},n.createRow=function(){var t=n.state,e=t.rows,o=t.columns,r=Object(u.a)(o),i=[].concat(Object(u.a)(e),[{key:n.rowKey++,columns:r}]);n.setState({rows:i})},n.deleteColumn=function(){var t=n.props.cellSize,e=n.state,o=e.rows,r=e.columns,i=n.state,a=i.currentCellIndex,c=i.removeColumnButtonLeft,l=Object(u.a)(o),s=Object(u.a)(r),f=s.length,p=f-1;f>1&&s.splice(a,1),a===p&&(c=t*(a-1)+2*a,a--),p<=1&&n.setState({removeColumnButtonDisplay:!1}),n.setState({rows:l,columns:s,removeColumnButtonLeft:c,currentCellIndex:a})},n.deleteRow=function(){var t=n.props.cellSize,e=n.state.rows,o=n.state,r=o.currentRowIndex,i=o.removeRowButtonTop,a=Object(u.a)(e),c=a.length,l=c-1;c>1&&a.splice(r,1),r===l&&(i=t*(r-1)+2*r,r--),l<=1&&n.setState({removeRowButtonDisplay:!1}),n.setState({rows:a,removeRowButtonTop:i,currentRowIndex:r})},n.showButtons=function(){var t=n.state,e=t.rows,o=t.columns;e.length>1&&n.setState({buttonsVisible:!0,removeRowButtonDisplay:!0}),o.length>1&&n.setState({buttonsVisible:!0,removeColumnButtonDisplay:!0})},n.hideButtons=function(){n.setState({buttonsVisible:!1})},n.state={square:[],rows:[],columns:[],rowKey:0,cellKey:0,containerPosition:{left:"".concat(2*n.props.cellSize,"px"),top:"".concat(2*n.props.cellSize,"px")},currentCellIndex:0,currentRowIndex:0,buttonsVisible:!1,removeRowButtonDisplay:!0,removeColumnButtonDisplay:!0,removeRowButtonTop:0,removeColumnButtonLeft:0,dragging:!1},n.rowKey=0,n.cellKey=0,n.offsetX=0,n.offsetY=0,n.onDragging=n.throttle(n.onDragging,20),n.containerRef=r.a.createRef(),n}return Object(m.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){this.createSquare(),this.container=document.querySelector("#container")}},{key:"render",value:function(){var t=this.props.cellSize,e=this.state,n=e.rows,o=e.columns,i=e.buttonsVisible,a=e.removeRowButtonDisplay,c=e.removeColumnButtonDisplay,u=e.removeRowButtonTop,l=e.removeColumnButtonLeft,s=e.containerPosition;return r.a.createElement(R,{onMouseMove:this.onDrag,onMouseUp:this.onDragEnd},r.a.createElement(D,{id:"container",ref:this.containerRef,containerPosition:s,cellSize:t,onMouseOver:this.movingButtons},r.a.createElement("div",{onMouseEnter:this.showButtons,onMouseLeave:this.hideButtons},r.a.createElement(k,{onMouseDown:this.onDragStart,onDragStart:function(){return!1}},r.a.createElement("tbody",null,n.map((function(e){return r.a.createElement("tr",{key:"row-".concat(e.key)},o.map((function(e){return r.a.createElement(z,{key:"cell-".concat(e.key),cellSize:t})})))})))),r.a.createElement(K,{onClick:this.deleteRow,cellSize:t,buttonsVisible:i,removeRowButtonDisplay:a,removeRowButtonTop:u},"-"),r.a.createElement(M,{onClick:this.deleteColumn,cellSize:t,buttonsVisible:i,removeColumnButtonDisplay:c,removeColumnButtonLeft:l},"-")),r.a.createElement(V,{cellSize:t,onClick:this.createRow},"+"),r.a.createElement(L,{cellSize:t,onClick:this.createColumn},"+")))}}]),e}(r.a.Component);P.defaultProps={cellSize:50,initialHeight:4,initialWidth:4};var X=function(){return r.a.createElement(P,{initialWidth:4,initialHeight:4,cellSize:50})};a.a.render(r.a.createElement(X,null),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.0022406c.chunk.js.map