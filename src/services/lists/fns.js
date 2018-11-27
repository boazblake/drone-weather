let log = m => v => {
  console.log(m, v), v
}

///// The foundation
let nil = f => x => x
let cons = h => t => f => x => f(h)(t(f)(x))
let foldr = list => f => x => list(f)(x)

///// List utilities
let length = xs => foldr(xs)(a => b => b + 1)(0)
let map = f => xs => foldr(xs)(y => ys => cons(f(y))(ys))(nil)
let filter = cond => xs =>
  foldr(xs)(value => already_filtered => f => x =>
    cond(value)
      ? f(value)(foldr(already_filtered)(f)(x))
      : foldr(already_filtered)(f)(x)
  )(nil)
let concat = xs => ys => foldr(xs)(cons)(ys)
let flatten = xs => foldr(xs)(concat)(nil)
let flatMap = list => f => flatten(map(f)(list))
let unit = x => cons(x)(nil) // constructs a unit list (one item)

// Allow us to print lists to the console
let show = list => list(a => b => '' + a.toString() + b)('')

let toArray = list => foldr(list)(x => struct => [x].concat(struct))([])

///// Demonstrations

let sum = list => foldr(list)(a => b => a + b)(0)
let list_1 = cons(1)(cons(2)(cons(3)(nil)))

let six = sum(list_1)
let three = length(list_1)
let twelve = sum(map(x => x * 2)(list_1))
let one_and_three = filter(x => x % 2 !== 0)(list_1)

let person_a_groceries = cons('rice')(cons('oranges')(nil))
let person_b_groceries = cons('monster')(cons('nos')(cons('hot cheetos')(nil)))
let shopping_list = flatten(
  cons(person_a_groceries)(cons(person_b_groceries)(nil))
)

///// More involved flatMap example
let customers = cons('john')(
  cons('jacob')(cons('jingleheimer')(cons('schmidt')(nil)))
)
let categories = cons('A')(cons('B')(cons('C')(nil)))
let products = function(category) {
  if (category === 'A') {
    return cons('a1')(cons('a2')(cons('a3')(nil)))
  } else if (category === 'B') {
    return cons('b1')(cons('b2')(nil))
  } else if (category === 'C') {
    return cons('c1')(cons('c2')(cons('c3')(cons('c4')(cons('c5')(nil)))))
  } else {
    return nil
  }
}

let likes = function(customer, category) {
  if (
    (customer === 'john' && (category === 'A' || category === 'C')) ||
    (customer === 'jacob' && category === 'B') ||
    (customer === 'jingleheimer' && (category === 'B' || category === 'C')) ||
    (customer === 'schmidt' && category === 'A')
  ) {
    return true
  }
  return false
}

let ads = flatMap(customers)(customer =>
  flatMap(categories)(
    category =>
      likes(customer, category)
        ? flatMap(products(category))(product =>
            unit('Ad to: ' + customer + ' for ' + product)
          )
        : nil
  )
)
