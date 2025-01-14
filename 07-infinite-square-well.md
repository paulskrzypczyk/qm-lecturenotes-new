---
title: "Chapter 7: The Infinite square well" 
short_title: "Ch. 7: Inf. sq. well"
numbering:
  enumerator: 7.%s
authors:
  - name: 
    affiliations:
---

In the previous [chapter](06-free-particle) we considered the simplest possible scenario, that of a **free particle** where there are no forces acting whatsoever. Here we will begin our exploration of how quantum particles behave when there are forces acting. This is a much more natural and common situation to consider, and is the generic one we encounter in physics. 

As already discussed in [chapter](04-energy), there are two **distinct** situations which we can consider. The first is where the forces **confine the particle to a finite region of space**. In this case, we often say that it is **trapped inside a potential well**. As we already stated, in quantum mechanics, it is in this situation where we end up with the famous **quantisation of energy**, the most notable example being the energy levels of atoms, which arise due to the fact that electrons are bound within the potential well of the nucleas (via the electromagnetic attraction). 

In this chapter we will study the **simplest** example of a potential well, and see explicitly **how** the energy levels arise. This model isn't very **physical**, but it is mathematically simple, and serves as an ideal starting point from which to study potential wells in quantum mechanics. 

The second situation we can encounter — as we did in the previous [chapter](06-free-particle) — is when the forces do not confine a particle to a finite region of space. We will return to more interesting examples — this time involving forces — in chapter x. 

After introducing the infinite square well, we will show how to find the energy eigenfunctions. This will see that we need a new fact about energy eigenfuctions, relating to their **continuity**. Remarkably, it is in fact from this that the quantisation of energies will arise, as we will see in detail below. 

We will then consider a simple example of the evolution in time of a particle inside the infinite square well, seeing that it is very different from what we saw in the previous chapter, for a free particle. 

## The infinite square well potential

We are going to consider a situation where a particle is **perfectly confined inside a box** of width $L$. We will assume that there are walls at $x = 0$ and $x = L$, and want to model these are being **perfectly elastic** so that the particle definite bounces off of these walls. We can model this using the following potential energy function,
```{math}
:label: e-infinite-square-well
V(x) = \begin{cases} 0 &\text{if }{0 \leq x \leq L,} \\
                    \infty &\text{if } x < 0 \text{ or } x > L.
        \end{cases}
```
This potential well is depicted in [](#f-infinite-square-well).

```{figure} ./Pictures/inf-square-well.svg
:name: f-infinite-square-well
:width: 400px
:align: center

**Infinite square well potential.** The potential energy of the infinite square well. The potential vanishes for $0 \leq x \leq a$, and is infinite otherwise. This well is an idealisation for a situation where a particle is trapped inside a 'box', i.e. between two perfectly elastic and impenetrable walls.
````
*Why do we take the potential energy to be infinite outside of the box?* Well, this means that the particle would have to have infinite energy to be outside. Thus, under the **physical assumption** that the particle can only have a **finite energy** then we see that this is a way of modelling a perfectly confined particle. This potential energy is itself unphysical, however we can take it as a **good approximation** to a **deep but finite well**. That is, one where the energy outside the well is $V_0$, which we take to be as large as we like. 

## Energy eigenstates of the infinite square well

The first question we would like to ask about the infinite square well is *what are the states of definite energy?* We are interested in this question, as always, since it is the first step towards understanding the dynamics of a particle confined inside our box. 

We are thus interested in finding the energy eigenstates of Hamiltonian, i.e. of finding solutions to [](#e-E-eigenvalue-eq). Since we have a **potential energy which depends upon position**, we will find the energy eigenstates by solving the TISE [](#e-TISE) instead. As we learnt in [](04-energy), this is a completely equivalent way of finding the energy levels and energy eigenstates, and is the natural way to do so in this situation. 

Because of the fact that the potential energy is specified **in pieces**, it means that the Hamiltonian operator $\op{H} = \op{K} + \op{V}$ will also be specified in pieces. What this means in practice is that **we will need to consider the different regions separately**, and then understand how to **put them together afterwards**. That is, we will need to consider the TISE in the region $x < 0$, the region $0 \leq x \leq L$, and the region $x > L$ separately. We will refer to these, respectively as **regions I, II and III**. If we denote a generic energy eigenfunction by $u_E(x)$, then we will specify this **in pieces** accordingly, via
```{math}
u_E(x) = \begin{cases} 
            u_E^\rI(x) &\text{if } x < 0, \\
            u_E^\rII(x) &\text{if } 0 \leq x \leq  L, \\
            u_E^\rIII(x) &\text{if } x > L.
\end{cases}
```



### Energy eigenfunctions in Regions I and III
Region I, when $x < 0$, is the region **outside and to the left** of the box. In this region, $V(x) = \infty$ and hence also $\op{H} = \infty$. This is a **strange situation**! We however already implicitly stated the solution. The entire reason for considering the infinite square well is to have the particle **confined within the region $0 \leq x \leq L$, inside the box**. A different way of phrasing this mathematically is that **the wavefunctions must necessarily always vanish outside of the well**.  Thus, we have
```{math}
:label: e-isq-rI
\vph u_E^\rI(x) = 0.
```
```{aside} *Mathematical derivation*
*You may feel slightly uncomfortable about this, as we haven't shown it mathematically, but just **stated** it as the answer. Furthermore, it isn't clear how we can verify it to satisfy the TISE $\op{H}u_E^\rI(x) = E u_E^\rI(x)$, since in region I $\op{H} = \infty$, and so we have an indeterminate expression on the left-hand side $\infty \cdot 0$. If we however consider that the potential energy is **finite** outside the well, and equal to $V_0$, we can then confirm that we trivially satisfy $0 = 0$ in the TISE. This is ultimately the root of the mathematical justification for the [](#e-isq-rI). We will however here accept it on intuitive grounds and not go into the mathematical details further.*
```
Region III, when $x > L$ is **identical** to region I, in that the potential energy is also infinite here. For the same reasons, we must also take any energy eigenfunction to vanish in this region, and so have
```{math}
:label: e-isq-rIII
\vph u_E^\rIII(x) = 0.
```

### Energy eigenfunctions in Region II
Region II is our primary region of interest, as this corresponds to $0\leq x\leq L$, inside the box. In this region $V(x) = 0$, and hence the Hamiltonian is simply
```{math}
\op{H} = \op{K} = \frac{\op{P}^2}{2M} = -\frac{\hbar^2}{2M}\frac{\partial^2}{\partial x^2}.
```
That is, inside the well, **the potential energy vanishes** and hence the particle is **essentially free** with no forces acting. We are thus in a very similar situation to [](06-free-particle). We can use this to realise that we already what the energy eigenfunctions must be in region II: **they must coincide with momentum eigenfunctions** — i.e. they must be **complex plane waves**. We can check this directly. In particular, we can see that $e^{ikx}$ is an eigenfunction of $\op{H}$, for any value $k$, 
```{math}
\vph \op{H}e^{ikx} &= -\frac{\hbar^2}{2M}\frac{\partial^2}{\partial x^2} e^{ikx},\\
&= \frac{\hbar^2 k^2}{2M} e^{ikx},
```
and the corresponding eigenvalue is $E = \frac{\hbar^2 k^2}{2M}$. 

However, as we also saw in [](06-free-particle), we have **degeneracy**, and the complex plane wave with $k' = -k$ is **an eigenfunction with the same energy eigenvalue** 
```{math}
\vph E' = \frac{\hbar^2(k')^2}{2M} =  \frac{\hbar^2(-k)^2}{2M} = \frac{\hbar^2 k^2}{2M} = E.
```
Since $e^{ikx}$ and $e^{-ikx}$ are both eigenfunctions with the **same** eigenvalue, as you will confirm in an exercise, **any superposition** of these two functions is **also** an eigenfunction with the same eigenvalue $E = \frac{\hbar^2 k^2}{2M}$. At this stage, we don't yet know **what is the correct superposition** to consider, so we will keep things general, and say that the energy eigenfunction will be of the form
```{math}
\vph u_E^\rII(x) = A e^{ikx} + B e^{-ikx},
```
where $A$ and $B$ are **arbitrary (complex) constants** which we don't yet know, and $E = \frac{\hbar^2 k^2}{2M}$. 

### Continuity of energy eigenfunctions & energy quantisation

*Where have we made it to?* Well, summarising the above, we have analysed the TISE in each of the three regions separately, and so far can conclude that the energy eigenfunctions must have the form
```{math}
:label: e-isw-eigenfunction-1
u_E(x) = \begin{cases}
            A e^{ikx} + B e^{-ikx}&\text{if } 0 \leq x \leq L, \\
            0 &\text{if } x < 0 \text{ or } x > L.
        \end{cases}
```

In order to make progress, we now need to use a new fact about energy eigenfunctions that we haven't needed to introduce until this point:
> Energy eigenfunctions must be **continuous** 

Recall that a **continuous function** is one which doesn't have any **jumps**. That is, there cannot be two neighbouring points which differ by a finite amount. An example of a **discontinuous** function is shown in [](#f-discontinuous).
```{figure} ./Pictures/discontinuous.svg
:label: f-discontinuous
:width: 300px
:align: center

**Example of a discontinuous function.** The function which has a discontinuity (i.e. a jump), at $x = x_a$.  Energy eigenfuctions must be continuous functions, and cannot have jumps like in this example.
```

We need to use this fact **at the boundaries between the three regions** at the walls of the box, at $x = 0$ and $x = L$. In particular, because of the fact that the eigenfunctions vanish for $x < 0$, continuity means that the wavefunction **must also vanish at $x = 0$, at the wall.** Substituting $x = 0$ into [](#e-isw-eigenfunction-1), we can therefore conclude that
```{math}
A + B = 0.
```
That is, whereas before we **didn't know which superposition to take**, continuity at $x = 0$ shows us that we can only take superpositions with $B = -A$, and hence in region II $u_E(x) = A(e^{ikx} - e^{-ikx})$. However, we can use **Euler's formula** to express this as $u_E(x) = 2iA\sin kx$. We then see nicely, since $\sin0 = 0$, that the eigenfunction vanishes at the left-hand wall, as we require. 

Turning now to the boundary between regions II and III, the right-hand wall, in order for the eigenfunction to vanish at $x = L$, we must take
```{math}
2iA\sin kL = 0.
```
One possible solution appears to be $A = 0$, however a little thought shows that this can't be correct. If $A = 0$, then $u_E(x) = 0$, and hence we have a **trivial mathematical solution**, but not an interesting physical one. In particular, we need energy eigenfunctions — as valid quantum wavefunctions — to be **normalised**. A wavefunction that vanishes everywhere certainty isn't normalised. Hence this isn't what we are looking for. 

The only other possibility is that $\sin kL = 0$. While this definitely **isn't true in general**, **there are special values of $k$ for which it will be true**! In particular, we know that $\sin \theta = 0$ if $\theta = 0$, $\pi$, $2\pi$, $3\pi$, $\ldots$, that is, if $\theta = n\pi$ for $n$ an integer. Thus, we must choose $k$ such that $kL = n\pi$, i.e.
````{card}
```{math}
k = \frac{n\pi}{L}.
```
````
For these special values of $k$, we will have $\sin kL = 0$, so the eigenfunction vanishes at the right-hand wall. 

Before going on, we can realise quickly that $n$ should be a **positive integer**. First, if $n = 0$, then $k = 0$ and so we have $\sin kx = \sin 0 = 0$. This is just the same as taking $A = 0$, which we already saw was mathematically correct, but not physically meaningful. We therefore are not interested in $n = 0$. For $n = -m$ (with $m$ a positive integer), we can use the fact that sine is an **odd** function, $\sin (-\theta) = -\sin \theta$. This means that $\sin n\pi x/L$ = $-\sin m\pi x/L$ and we have the **same** eigenfunction **up to a minus sign**. Since $-1$ is just a **phase**, and since we saw previously in [](#s-stationary) that an overall phase doesn't change any of the physical properties of a quantum state, $n$ and $-n$ in fact **lead to the same energy eigenfunction**, hence we only need to keep one value of $n$. It is customary to keep the positive one. 

Thus, putting everything together, the requirement of **continuity** has lead us to the conclusion that $k$ must be a **positive multiple of $\pi/L$**. Since the **energy eigenvalues** were nothing but $E = \hbar^2k^2/2M$, we therefore see that for a particle confined to an infinite square well, there are **discrete energy levels**
````{card}
```{math}
:label: e-isw-energy-levels
E_n &= \frac{\hbar^2 \pi^2 n^2}{2M L^2},& n &=1, 2, \ldots
```
````
These are the **only energies that the particle can have with certainty**. It is simply impossible for the particle to have any other energy! The energy levels are depicted below in [](#f-isw-levels)
````{figure} ./Pictures/energy-levels-inf-sq-well.svg
:name: f-isw-levels
:width: 400px
:align: center

**Energy levels of the infinite square well.** The allowed energies of the infinite square well are discrete. The allowed energies are denoted by $E_n$, and they increase quadratically, proportional to $n^2$.
````


For the corresponding **energy eigenfunctions** $u_{E_n}(x)$, there is **one final detail to take care of**. We still appear to have one parameter left — $A$. This is however fixed by **normalisation**: we require $u_{E_n}(x)$ to be a normalised wavefunction. As an exercise, you show that the normalisation constant is $A = \frac{1}{2i}\sqrt{\frac{2}{L}}$ (independent of $n$). The **energy eigenfunctions** are thus given by
````{card}
```{math}
u_n(x) = \begin{cases}
            \sqrt{\frac{2}{L}}\sin \frac{n\pi x}{L}&\text{if } 0 \leq x \leq L, \\
            0 &\text{if } x < 0 \text{ or } x > L.
        \end{cases}
```
````
Note that here we have **changed notation** from $u_{E_n}(x)$ to $u_{n}(x)$. There are two reasons for doing this. The first is for brevity. The second is that it is much more **common** to label the energy levels by $n$, and leave it **implicit** that the energy is $E_n$ as given by [](#e-isw-energy-levels). In fact $n$ is often referred to as a **quantum number**, and energy levels and energy eigenfunctions are labelled solely by the quantum number, in this case $E_n$ and $u_n(x)$. 

We depict below in [](#f-isw-eigenfunctions) the first 6 energy eigenfunctions and in [](#f-isw-pd) the associated probability density functions. 

````{figure} ./Pictures/eigenstates-inf-sq-well.svg
:name: f-isw-eigenfunctions
:width: 500px
:align: center

**Eigenfunctions of the infinite square well.** The first six energy eigenfunctions $u_n(x)$ of the infinite square well. 
````

````{figure} ./Pictures/probs-inf-sq-well.svg
:name: f-isw-pd
:width: 500px
:align: center

**Probability densities of the infinite square well.** The probability densities $\pd(x)$ for the first six energy eigenstates of the infinite square well. 
````
There is clearly some structure here, and also some surprises. The first surprising feature is that the **minimum energy the particle can have is strictly bigger than the minimum of potential energy**. That is, the lowest energy state — referred to as the **ground state** $\ket{E_1}$ — has energy $E_1 = \frac{\hbar^2\pi^2}{2ML^2} > 0 = V(x)$ inside the well. This is in stark constrast to classical physics, where a particle can be **at rest** at the **minimum of a potential well**, and hence have energy **equal** to the minimum potential energy. In quantum mechanics, in contrast, a particle has **move** energy than this. This additional energy is called the **zero-point energy**. It arises due to the HUP, and the fact that the kinetic and potential energy of a particle are incompatible properties. In particular, because the particle is **confined within the well**, it necessarily has a spread of momenta, and hence a spread of kinetic energy. So the confinement of the particle in fact demands that it will have kinetic energy! The ground state is in fact a **balance** between minimising the potential energy, and minimising the potential energy. 


Maybe second most surprising is that when a particle has a definite energy, there are certain regions within the well where **it is very unlikely to find the particle**. For example, in the so-called **first excited state** $\ket{E_2}$ (with associated energy eigenfunction $u_2(x)$) it is very unlikely to find the particle close to the middle of the well! 

## Evolution of a particle inside an infinite square well

Having obtained the energy eigenstates and energy eigenvalues, we now again have the ingredients we need in order to study the **evolution** of a particle inside the well. We will once again use the **superposition principle** to achieve this.

Consider a particle prepared initially at $t = 0$ with the wavefunction
```{math}
:label: e-init-superposition-isw
\psi_\init(x) = \sum_{n=1}^\infty \alpha_n u_n(x).
```
We will start off assuming that **we know the amplitudes $\alpha_n$**, and come back to the question of how we determine these shortly below. [](#e-init-superposition-isw) specifies the initial wavefunction as a **superposition** of energy eigenfunctions. 

As we saw in the previous two chapters, given in this form, we can immediately write down the wavefunction $\psi(x,t)$ that it will evolve into: this is once again an application of the superposition principle: *the evolution of the superpositon (of energy eigenfunctions) is just the superposition of the evolutions (of individual energy eigenfunctions)*. Each energy eigenfunction evolves in the usual simple way: by acquiring a phase $e^{-iE_n t/\hbar}$ in time. Thus the wavefunction at time $t$ will be
````{card}
```{math}
\psi(x,t) = \sum_{n=1}^{\infty} \alpha_n e^{-iE_n t/\hbar} u_n(x),
```
````
precisely as already given in [](#e-wf-soln-to-SE-bound) (except we updated our notation for energy eigenfunctions from $u_{E_n}(x)$ to $u_n(x)$, as explained above, and now we have infinitely many energy levels, rather than $d$). 

Much like in the [previously chapter](06-free-particle), there is still a loose end that we should address, namely **how to determine $\alpha_n$ if we are only given $\psi_\init(x)$?** 

In order to answer this, it is useful to go back to the full quantum state $\ket{\psi_\init}$. Written in terms of this, [](#e-init-superposition-isw) is 
```{math}
\ket{\psi_\init} = \sum_{n=1}^\infty \alpha_n \ket{E_n},
```
and we recover [](#e-init-superposition-isw) from this, by taking the scalar product on both sides with a position state $\bra{x}$, and recalling that $\inner{x}{\psi_\init} = \psi_\init(x)$ and $\inner{x}{E_n} = u_n(x)$. 

If now however we take the scalar product on both sides with an energy eigenstate $\bra{E_m}$, recalling from [](#e-energy-levels-orthonormal) that the energy levels are **orthogonal quantum states**, then we see immediately that
```{math}
\inner{E_m}{\psi_\init} &= \sum_{n=1}^\infty \alpha_n \inner{E_m}{E_n},\\
&= \sum_{n=1}^\infty \alpha_n \delta_{m,n},\\
&= \alpha_m.
```