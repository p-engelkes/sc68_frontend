import {User} from "./user";
import {Team} from "./team";
/**
 * Created by pengelkes on 30.12.2016.
 */

export class Article {
  public id: number;
  public title: string;
  public content: string;
  public author: User;
  public authorId: number;
  public team: Team;
  public teamId: number;
  public created: Date;

  constructor(id?: number, title?: string, content?: string, author?: User, authorId?: number, team?: Team,
              teamId?: number, created?: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.authorId = authorId;
    this.team = team;
    this.created = created;
  }

  static get(json): Article {
    let article = new Article();
    article.id = json.id;
    article.title = json.title;
    article.content = json.content;
    article.authorId = json.authorId;
    article.teamId = json.teamId;
    article.created = json.created;

    if (json.author) {
      article.author = User.deserialize(json.author)
    }

    return article;
  }

  static getAll(data: any): Article[] {
    let articles: Article[] = [];
    let articlesJson = JSON.parse(data._body);
    for (let i = 0; i < articlesJson.length; i++) {
      let articleJson = articlesJson[i];
      let article = Article.get(articleJson);
      articles.push(article);
    }

    return articles;
  }
}
