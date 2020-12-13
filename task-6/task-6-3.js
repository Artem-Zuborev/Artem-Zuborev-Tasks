
const myCar = {
    car: '',
    model: '',
  }
if(!Function.prototype.apply){
  Function.prototype.apply = function (context, mas) {
    const uuid = Date.now().toString();
    const obj = { ...context };
    obj[uuid]= this;
    const res = obj[uuid](...mas);
    delete obj[uuid]
    return res;
  }
}
function fullNameCar() {
      return `${this.car} ${this.model}`
    }
  
  function getFullNameCar(car, model) {
    this.car = car;
    this.model = model;
      return (fullNameCar.apply(this, []));
  }

  console.log(getFullNameCar.apply(myCar, ['Honda', 'Accord']))