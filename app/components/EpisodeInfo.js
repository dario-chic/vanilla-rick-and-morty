export function EpisodeInfo(json) {
	return `
	<button class="close"><i class="fa-solid fa-circle-arrow-left"></i></button>
	<figure class="profile episodes">
	<img src="${json.image.original}" alt="" >
	<figcaption>${json.name.toUpperCase()}</figcaption>
	</figure>

  <details class="episode-content">
  <summary>Resume</summary>
  <article>${json.summary}</article>
</details>

	<table class="features">
<tr>
<th>Airdate</th>
<td class="airdate">${json.airdate}</td>
</tr>
<tr>
<th>Episode</th>
<td class="episode"><span class="s">S${json.season}</span> <span class="e">E${json.number}</span></td>
</tr>
<tr>
<th>Rating</th>
<td>${json.rating.average}</td>
</tr>
	</table>
	`;
}
