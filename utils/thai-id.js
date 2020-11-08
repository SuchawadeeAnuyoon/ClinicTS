import thaiIdCard from 'thai-id-card';

let checkIDCard = id => {
  return thaiIdCard.verify(id)
}

export default {
  checkIDCard
}