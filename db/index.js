function fill_template() {
    var data = {
        title: "MealMapper Results",
        list: [
            {{results}}
            {{ingredients}}
            {{recipes}}
            {{tags}}
            {{users}}
            {{user_ingredients}}
            {{user_recipes}}
        ],
    footer: "this is the footer"
};
var templete = Handlebars.compile(document.quesrySelector('#template').innerHTML);
var filled = template(data);
document.querySelector('#output').innerHTML = filled;
}
