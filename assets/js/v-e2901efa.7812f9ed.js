"use strict";(self.webpackChunkangular_training=self.webpackChunkangular_training||[]).push([[236],{7204:(a,e,n)=>{n.r(e),n.d(e,{default:()=>m});var s=n(6252),t=n(9589),i=n(7469);const p=(0,s.uE)('<h1 id="pipes" tabindex="-1"><a class="header-anchor" href="#pipes" aria-hidden="true">#</a> Pipes</h1><p>Pipes are <strong>data transformation functions</strong> usable directly from the template in order to transform the data to be displayed at binding time. They are interesting in two main ways:</p><ul><li>they don&#39;t require to change the data in the component so that it is displayed in a user-friendly way</li><li>they are declared once and can be reused in as many components as needed as they are independant from them</li></ul><h2 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax" aria-hidden="true">#</a> Syntax</h2><p>Angular pipe syntax is inspired by the unix shell pipes:</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ user.lastName | uppercase  }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Parameters can be passed to pipes. They are placed after the pipe&#39;s name and separated by colons:</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ user.registrationDate | date:&#39;dd/MM/yyyy&#39; }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ user.registrationDate | date:&#39;dd/MM/yyyy hh:mm&#39;:&#39;UTC&#39; }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ user.registrationDate | date:&#39;dd/MM/yyyy hh:mm&#39;:&#39;+0200&#39;:&#39;fr&#39; }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Pipes can be chained:</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ user.birthDate | date | uppercase }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="built-in-pipes" tabindex="-1"><a class="header-anchor" href="#built-in-pipes" aria-hidden="true">#</a> Built-in pipes</h2>',11),o={href:"https://angular.io/api?type=pipe",target:"_blank",rel:"noopener noreferrer"},l=(0,s.uE)('<ul><li><code>AsyncPipe</code> unwraps a value from an asynchronous primitive</li><li><code>CurrencyPipe</code> transforms a number to a currency string according to locale rules</li><li><code>DatePipe</code> formats a date value according to locale rules</li><li><code>DecimalPipe</code> formats a value according to digit options and locale rules</li><li><code>I18nPluralPipe</code> maps a value to a string that pluralizes the value according to locale rules</li><li><code>I18nSelectPipe</code> generic selector that displays the string that matches the current value</li><li><code>JsonPipe</code> converts a value into its JSON-format representation, useful for debugging</li><li><code>KeyValuePipe</code> transforms Object or Map into an array of key value pairs</li><li><code>LowerCasePipe</code> transforms text to all lower case</li><li><code>PercentPipe</code> transforms a number to a percentage string, formatted according to locale rules</li><li><code>SlicePipe</code> creates a new Array or String containing a subset (slice) of the elements</li><li><code>TitleCasePipe</code> transforms text to title case</li><li><code>UpperCasePipe</code> transforms text to all upper case</li></ul><p><strong>Exercise: Format the price (in EUR) and the date (&#39;EEEE dd MMMM y&#39;), both in French</strong></p><iframe height="500" width="100%" src="https://stackblitz.com/edit/angular-currency-pipe-training-example?ctl=1&amp;embed=1&amp;file=src/app/app.component.html&amp;hideNavigation=1"></iframe><h2 id="custom-pipe" tabindex="-1"><a class="header-anchor" href="#custom-pipe" aria-hidden="true">#</a> Custom pipe</h2><p>If built-in pipes do not cover a use case you encounter, Angular gives you the opportunity to create a custom one.</p><p>Creating a custom Pipe requires you to:</p><ul><li>create a class that implements the <code>PipeTransform</code> interface</li><li>decorate it with the <code>@Pipe()</code> decorator</li><li>add it to the <code>declarations</code> (and <code>exports</code> if need be) of its associated module</li></ul>',7),r={href:"https://angular.io/cli/generate#pipe",target:"_blank",rel:"noopener noreferrer"},c=(0,s.uE)('<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ng generate pipe <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>It generates the following file:</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Pipe<span class="token punctuation">,</span> PipeTransform <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@angular/core&#39;</span>\n\n<span class="token decorator"><span class="token at operator">@</span><span class="token function">Pipe</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;demo&#39;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">DemoPipe</span> <span class="token keyword">implements</span> <span class="token class-name">PipeTransform</span> <span class="token punctuation">{</span>\n\n  <span class="token function">transform</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">unknown</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">null</span>\n  <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>transform</code> method&#39;s first argument is the value on which the pipe is applied, the method then takes any number of arguments. It is recommanded to type all the arguments as well as the return type.</p><p>The pipe&#39;s name should be in lowerCamelCase. It is a good practice to make it start with your app&#39;s initials, just like for the selector of your components.</p><p>Just like any other class, pipes can make use of their constructor to benefit from dependency injection. It is possible to inject another pipe for instance. This is particularly useful when a built-in pipe is going to be used throughout the application with the same parameters. A custom pipe can serve as a wrapper so as to simplify the use of a built-in pipe.</p><p>In the following example, the discounted price is calculated given a discount rate. No catalogue data in the component is mutated to display the new price.</p><iframe height="500" width="100%" src="https://stackblitz.com/edit/angular-pipe-exemple?embed=1&amp;file=src/app/discounted.pipe.ts&amp;ctl=1&amp;hideNavigation=1"></iframe><h2 id="using-a-pipe-outside-the-template" tabindex="-1"><a class="header-anchor" href="#using-a-pipe-outside-the-template" aria-hidden="true">#</a> Using a pipe outside the template</h2><p>It is also possible to use pipes in a component class by injecting it in its constructor and calling its transform method. The pipe needs to be imported in the module to which the component belongs and added to the providers of the component or of the module.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@angular/core&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> UpperCasePipe <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@angular/common&#39;</span>\n\n<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  selector<span class="token operator">:</span> <span class="token string">&#39;app-root&#39;</span><span class="token punctuation">,</span>\n  templateUrl<span class="token operator">:</span> <span class="token string">&#39;./app.component.html&#39;</span><span class="token punctuation">,</span>\n  styleUrls<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;./app.component.css&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  providers<span class="token operator">:</span> <span class="token punctuation">[</span> UpperCasePipe <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>\n\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> upperCasePipe<span class="token operator">:</span> UpperCasePipe<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n  title <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>upperCasePipe<span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span><span class="token string">&#39;title&#39;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="practical-work-format-rating" tabindex="-1"><a class="header-anchor" href="#practical-work-format-rating" aria-hidden="true">#</a> Practical work: format rating</h2><ol><li>Create a <code>starRating</code> pipe using the CLI in the folder <code>app/pipes</code>.</li><li>Implement the inside of the transform method so that a film&#39;s metascore is displayed with ★ to five ★★★★★ rating.</li><li>Use this pipe in the template of the <code>LoginFormComponent</code>.</li><li>Commit</li></ol><details class="custom-container details"><summary>Expected result</summary><p><img src="'+t+'" alt="Visual result of the pipe practical work 1"></p><p><img src="'+i+'" alt="Visual result of the pipe practical work 2"></p></details><h2 id="to-go-further" tabindex="-1"><a class="header-anchor" href="#to-go-further" aria-hidden="true">#</a> To go further</h2>',15),u={href:"https://medium.com/@ghoul.ahmed5/pure-vs-impure-pipe-in-angular-2152cf073e4d",target:"_blank",rel:"noopener noreferrer"},d={},m=(0,n(3744).Z)(d,[["render",function(a,e){const n=(0,s.up)("ExternalLinkIcon");return(0,s.wg)(),(0,s.iD)("div",null,[p,(0,s._)("p",null,[(0,s.Uk)("Angular provides over a "),(0,s._)("a",o,[(0,s.Uk)("dozen built-in pipes"),(0,s.Wm)(n)]),(0,s.Uk)(" to cover common use cases. Here is a complete list of them:")]),l,(0,s._)("p",null,[(0,s.Uk)("The CLI will take care of these three points for us via the following "),(0,s._)("a",r,[(0,s.Uk)("command"),(0,s.Wm)(n)]),(0,s.Uk)(":")]),c,(0,s._)("p",null,[(0,s.Uk)("The difference between "),(0,s._)("a",u,[(0,s.Uk)("pure and impure pipes"),(0,s.Wm)(n)])])])}]])},7757:(a,e,n)=>{n.r(e),n.d(e,{data:()=>s});const s=JSON.parse('{"key":"v-e2901efa","path":"/pipes/","title":"Pipes","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Syntax","slug":"syntax","link":"#syntax","children":[]},{"level":2,"title":"Built-in pipes","slug":"built-in-pipes","link":"#built-in-pipes","children":[]},{"level":2,"title":"Custom pipe","slug":"custom-pipe","link":"#custom-pipe","children":[]},{"level":2,"title":"Using a pipe outside the template","slug":"using-a-pipe-outside-the-template","link":"#using-a-pipe-outside-the-template","children":[]},{"level":2,"title":"Practical work: format rating","slug":"practical-work-format-rating","link":"#practical-work-format-rating","children":[]},{"level":2,"title":"To go further","slug":"to-go-further","link":"#to-go-further","children":[]}],"git":{},"filePathRelative":"pipes/README.md"}')},9589:(a,e,n)=>{a.exports=n.p+"assets/img/visual-1.42504f6c.png"},7469:(a,e,n)=>{a.exports=n.p+"assets/img/visual-3.56850083.png"}}]);