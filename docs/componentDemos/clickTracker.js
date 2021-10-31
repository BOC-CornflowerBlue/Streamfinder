// import ClickTracker from './sharedComponents/ClickTracker.jsx';

// return (
//   <div id="po-cart" class="column">
//     {
//       this.state.promptSelection &&
//       <div class="error-prompt">Please select size</div>
//     }
//     <div class="row">
//       <SizeSelector
//         skus={ skusList }
//         sizes={ sizesList }
//         onSelect={ this.handleSizeSelect }
//       />
//       <QuantitySelector
//         maxQuantity={ maxQuantity }
//         onSelect={ this.handleQuantitySelect }
//       />
//     </div>
//     {
//       this.isInStock &&
//       <ClickTracker eventName="clickTracker" moduleName="Product Overview">
//         <AddButton
//           label={ 'add to bag' }
//           id={ 'checkout' }
//           onClick={ this.handleCheckout }
//         />
//       </ClickTracker>
//     }
//   </div>
// );