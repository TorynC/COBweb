class Article {
    constructor(title, link, reputability) {
        this.title = title;
        this.link = link;
        this.reputability = reputability;
    }
    toString() {
        return "Title: " + this.title + " Link: " + this.link + " Reputability " + this.reputability
    }
}
export default Article
