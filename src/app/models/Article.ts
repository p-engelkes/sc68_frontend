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

  static create(): Article {
    return new Article();
  }

  public setId(id: number): Article {
    this.id = id;
    return this;
  }

  public setTitle(title: string): Article {
    this.title = title;
    return this;
  }

  public setContent(content: string): Article {
    this.content = content;
    return this;
  }

  public setAuthor(author: User): Article {
    this.author = author;
    return this;
  }

  public setAuthorId(authorId: number): Article {
    this.authorId = authorId;
    return this;
  }

  public setTeam(team: Team): Article {
    this.team = team;
    return this;
  }

  public setTeamId(teamId: number): Article {
    this.teamId = teamId;
    return this;
  }

  public setCreated(created: Date): Article {
    this.created = created;
    return this;
  }

  static deserialize(json): Article {
    let article = Article.create()
      .setId(json.id)
      .setTitle(json.title)
      .setContent(json.content)
      .setAuthorId(json.authorId)
      .setTeamId(json.teamId)
      .setCreated(json.created);

    if (json.author) {
      article.setAuthor(User.deserialize(json.author))
    }

    //TODO: Set team of article

    return article;
  }

  static getArticlesFromRestResponse(data: any): Article[] {
    let articles: Article[] = [];
    let articleResponses = JSON.parse(JSON.stringify(data))._body;
    let articlesJson = JSON.parse(articleResponses);
    for (let i = 0; i < articlesJson.length; i++) {
      let articleJson = articlesJson[i];
      let article = Article.deserialize(articleJson);
      articles.push(article);
    }

    return articles;
  }
}
