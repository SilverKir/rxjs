import { Injectable } from "@nestjs/common";
import {
  firstValueFrom,
  toArray,
  from,
  map,
  mergeAll,
  take,
  Observable,
} from "rxjs";
import axios from "axios";

import { RepoURL } from "./config/RepoURL";

@Injectable()
export class RxjsService {
  private getGitlab(
    text: string,
    count: number,
    data: string
  ): Observable<any> {
    return from(
      axios.get(`${RepoURL[data].GitLab}${text}`, {
        headers: {
          "PRIVATE-TOKEN": `${process.env.GITLAB_TOKEN}`,
        },
      })
    )
      .pipe(
        map((res: any) => res.data),
        mergeAll()
      )
      .pipe(take(count));
  }

  private getGithub(
    text: string,
    count: number,
    data: string
  ): Observable<any> {
    return from(axios.get(`${RepoURL[data].GitHub}${text}`))
      .pipe(
        map((res: any) => res.data.items),
        mergeAll()
      )
      .pipe(take(count));
  }

  async searchRepositories(
    text: string,
    hub: string,
    data: string
  ): Promise<any> {
    console.log("hub = ", hub);
    let data$;
    if (hub === "GitLab") {
      data$ = this.getGitlab(text, 10, data).pipe(toArray());
    } else {
      data$ = this.getGithub(text, 10, data).pipe(toArray());
    }
    data$.subscribe(() => {});
    return await firstValueFrom(data$);
  }
}
