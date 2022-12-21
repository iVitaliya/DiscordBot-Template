import {
    ButtonStyle,
    ComponentType,
    Message
} from "discord.js";

import {
    BasicPager,
    ButtonID,
    Embed,
    FooterTime,
    GuildBasedTextChannels
} from "@lib";


interface IPagination {
    title: string;
    channel: GuildBasedTextChannels;
    arr: string[] | any[];
    itemsPerPage: number;
    authorID: string;
}

export class Pagination {
    private title: string;
    private channel: GuildBasedTextChannels;
    private arr: string[] | any[];
    private itemsPerPage: number;
    private msg!: Message;
    private pageNumber = 1;
    private authorID: string;

    constructor(data: IPagination) {
        this.title = data.title;
        this.channel = data.channel;
        this.arr = data.arr;
        this.itemsPerPage = data.itemsPerPage < 5
            ? 5
            : data.itemsPerPage;
        this.authorID = data.authorID;
    }

    /**
     * @EXAMPLE
    const filter = i => i.customId === 'primary' && i.user.id === '122157285790187530';

    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
        await i.update({ content: 'A button was clicked!', components: [] });
    });

    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
     */
    private collecter() {
        const collector = this.channel.createMessageComponentCollector({
            filter: (i) => i.user.id === this.authorID,
            time: 25000
        });

        collector.on("collect", async (i) => {
            switch (i.customId as ButtonID) {
                case "pagination.begin":
                    await this.setPage(1);
                    break;

                case "pagination.previous":
                    await this.previous();
                    break;

                case "pagination.stop":
                    await this.stop();
                    collector.stop("Collector ended!");
                    break;

                case "pagination.next":
                    await this.next();
                    break;

                case "pagination.end":
                    await this.end();
                    break;
            }
        });

        collector.on("end", (_, r) => {
            if (["timeout", "time"].includes(r)) {
                collector.stop("Collector ended!");
            }
        });
    }

    public async start() {
        this.msg = await this.channel.send({
            embeds: [
                new Embed()
                    .setTheme({ theme: "Main", title: this.title })
                    .setDescription(
                        BasicPager({
                            arr: this.arr,
                            itemsPerPage: this.itemsPerPage,
                            page: this.pageNumber
                        })!.data.join("\n")
                    )
                    .setFooter({ text: FooterTime })
                    .build()
            ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: ComponentType.Button,
                            customId: "pagination.begin",
                            label: "First Page",
                            style: ButtonStyle.Primary
                        },
                        {
                            type: ComponentType.Button,
                            customId: "pagination.previous",
                            label: "Prev. Page",
                            style: ButtonStyle.Primary
                        },
                        {
                            type: ComponentType.Button,
                            customId: "pagination.stop",
                            label: "Stop",
                            style: ButtonStyle.Danger
                        },
                        {
                            type: ComponentType.Button,
                            customId: "pagination.next",
                            label: "Next Page",
                            style: ButtonStyle.Primary
                        },
                        {
                            type: ComponentType.Button,
                            customId: "pagination.end",
                            label: "Last Page",
                            style: ButtonStyle.Primary
                        }
                    ]
                }
            ]
        });

        this.collecter();
    }

    public async setPage(page: number) {
        this.pageNumber = page;

        await this.msg.edit({
            embeds: [
                new Embed()
                    .setTheme({ theme: "Main", title: this.title })
                    .setDescription(
                        BasicPager({
                            arr: this.arr,
                            itemsPerPage: this.itemsPerPage,
                            page
                        })!.data.join("\n")
                    )
                    .setFooter({ text: FooterTime })
                    .build()
            ]
        });
    }

    /** Goes to the next page */
    public async next() {
        await this.setPage(this.pageNumber + 1);
    }

    /** Goes to the previous page */
    public async previous() {
        await this.setPage(this.pageNumber - 1);
    }

    /** Goes to page 1 */
    public async begin() {
        await this.setPage(1);
    }

    /** Goes to last page */
    public async end() {
        await this.setPage(this.arr.length);
    }

    /** Stops the pagination - WIP */
    public async stop() {
        await this.msg.edit({
            components: [
                {
                    type: 2,
                    components: [
                        {
                            type: ComponentType.Button,
                            customId: "pagination.begin",
                            label: "First Page",
                            style: ButtonStyle.Primary,
                            disabled: true
                        },
                        {
                            type: ComponentType.Button,
                            customId: "pagination.previous",
                            label: "Prev. Page",
                            style: ButtonStyle.Primary,
                            disabled: true
                        },
                        {
                            type: ComponentType.Button,
                            customId: "pagination.stop",
                            label: "Stop",
                            style: ButtonStyle.Danger,
                            disabled: true
                        },
                        {
                            type: ComponentType.Button,
                            customId: "pagination.next",
                            label: "Next Page",
                            style: ButtonStyle.Primary,
                            disabled: true
                        },
                        {
                            type: ComponentType.Button,
                            customId: "pagination.end",
                            label: "Last Page",
                            style: ButtonStyle.Primary,
                            disabled: true
                        }
                    ]
                }
            ]
        });
    }
}