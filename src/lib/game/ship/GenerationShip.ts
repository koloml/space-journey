import GameObject from "@/lib/littlejs/GameObject";

export default class GenerationShip extends GameObject {
    public tileSize = vec2(48, 128);
    public tileIndex = 0;
    public size = vec2(48, 128);
}